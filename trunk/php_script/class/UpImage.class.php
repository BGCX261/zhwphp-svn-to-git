<?php
/**
 * ------------------------------
 * 图片上传类（批量，缩略图，水印）
 * ------------------------------
 * @name    UpImage.class.php
 * @version 2010.06.27
 * @author  张宏伟
 */

class UpImage
{
    /**
     * 上传目录
     * @var string
     */
    private $upPath = '';
    /**
     * 上传后的文件信息
     * @var array
     */
    private $saveFileInfo = array();
    /**
     * 允许上传文件的最大值(默认1M)
     * @var int
     */
    private $maxSize;
    /**
     * 允许上传的文件后缀名
     * @var array
     */
    private $allowExt;
    /**
     * 默认允许上传的文件的mime类型
     * @var array
     */
    private $allowType;
    /**
     * 添加水印图片（水印图片路径）
     * @var string
     */
    public  $waterPic;
    /**
     * 水印透明度（0-100）
     * @var int
     */
    public  $waterPct = 50;
    /**
     * 水印图片背景颜色（将设为透明）
     * @var string
     */
    public  $waterPicBgcolor = '#ffffff';
    /**
     * 是否生成缩略图
     * @var bool
     */
    public  $thumb = false;
    /**
     * 缩略图最大宽度
     * @var int
     */
    public  $thumbMaxWidth = 120;
    /**
     * 缩略图最大高度
     * @var int
     */
    public  $thumbMaxHeight = 120;

    /**
     * -----------------------------
     * 构造函数
     * -----------------------------
     * @param  string $upPath        上传路径
     * @param  int $maxSize          上传文件大小最大值(M为单位)
     * @param  array $allowExt       允许上传的文件后缀
     * @param  array $allowType      允许上传的文件mine类型
     */
    function __construct($upPath='',$maxSize=1,$allowExt='',$allowType='')
    {
        $this->upPath = ($upPath == '') ? "upLoad/".date('Y')."/".date('m')."/" : $upPath;
        $this->maxSize = $maxSize * 1024 * 1024;
        $this->allowExt = ($allowExt == '') ? array('.jpg','.jpeg','.gif','.png','.bmp') : $allowExt;
        $this->allowType = ($allowType == '') ? array('image/jpeg','image/pjpeg','image/gif','image/x-png','image/bmp') : $allowType;
    }

    /**
     * -----------------------------
     * 上传函数
     * -----------------------------
     * @param  array/string  $file   上传框名称
     */
    function UpLoad($file)
    {
        //如果上传框是这样的数组$images[]
        if (!is_array($file) && is_array($_FILES[$file]['name']))
        {
            foreach ($_FILES[$file]['name'] as $key => $val)
            {
                $arr['error'] = $_FILES[$file]['error'][$key];
                $arr['fileName'] = $_FILES[$file]['name'][$key];
                $arr['fileSize'] = $_FILES[$file]['size'][$key];
                $arr['fileType'] = $_FILES[$file]['type'][$key];
                $arr['tmpName']  = $_FILES[$file]['tmp_name'][$key];
                if (!$this->uploadFunction($arr,$key)) continue;
            }
        }
        //如果上传框是这样的数组array('image1','image2')或单个字符串'image';
        else
        {
            if (!is_array($file)) $file = array($file);
            foreach ($file as $k => $v)
            {
                if (is_array($_FILES[$v]['name'])) exit('不支持这样的上传方式！');
                $arr['error'] = $_FILES[$v]['error'];
                $arr['fileName'] = $_FILES[$v]['name'];
                $arr['fileSize'] = $_FILES[$v]['size'];
                $arr['fileType'] = $_FILES[$v]['type'];
                $arr['tmpName']  = $_FILES[$v]['tmp_name'];
                if (!$this->uploadFunction($arr,$k)) continue;
            }
        }
    }

    /**
     * ------------------------------
     * 判断上传状态并上传文件函数
     * ------------------------------
     * @param  array $array
     * @param  int $k
     * @return bool
     */
    private function uploadFunction($array,$k)
    {
        extract($array);
        if ($error != 0)
        {
            if ($error == 1 || $error ==2)
            $this->saveFileInfo[$k]['error'] = '文件《'.$fileName.'》大小超出允许';
            elseif ($error == 3)
            $this->saveFileInfo[$k]['error'] = '文件《'.$fileName.'》只部分被上传';
            elseif ($error == 4)
            $this->saveFileInfo[$k]['error'] = '没有文件上传';
            return false;
        }
        if (!$this->chkExt($fileName))
        {
            $this->saveFileInfo[$k]['error'] = '文件《'.$fileName.'》后缀不允许';
            return false;
        }
        if (!$this->chkSize($fileSize))
        {
            $this->saveFileInfo[$k]['error'] = '文件《'.$fileName.'》的大小超过允许';
            return false;
        }
        if (!$this->chkType($fileType))
        {
            $this->saveFileInfo[$k]['error'] = '文件《'.$fileName.'》的类型超出允许';
            return false;
        }
        @mkdir($this->upPath,0755,true);
        $saveName = $this->notExistsFileName($fileName);
        $savePath = $this->upPath.$saveName;
        if (!is_uploaded_file($tmpName))
        {
            $this->saveFileInfo[$k]['error'] = '《'.$tmpName.'》不是合法的上传文件';
            return false;
        }
        if (!move_uploaded_file($tmpName,$savePath))
        {
            $this->saveFileInfo[$k]['error'] = '文件《'.$fileName.'》无法移动';
            return false;
        }
        //添加水印
        if ($this->waterPic) $this->imageWater($savePath,$this->waterPic);
        //生成缩略图
        if ($this->thumb) $this->imageThumb($savePath,$savePath.'_thumb.jpg');
        //存储已经上传的文件信息
        $this->saveFileInfo[$k] = array
        (
        'fileName' => $fileName,
        'fileSize' => $fileSize,
        'fileType' => $fileType,
        'saveName' => $saveName,
        'savePath' => $savePath,
        );
        return true;
    }

    /**
     * -----------------------------
     * 给上传的图片添加水印
     * -----------------------------
     * @param  string $pic 要添加水印的图片
     * @param  string $waterPic 水印图片
     */
    private function imageWater($pic,$waterPic)
    {
        $picInfo = getimagesize($pic);
        $newPic = imagecreatetruecolor($picInfo[0],$picInfo[1]);
        //$white = imagecolorallocate($newPic,255,255,255);
        //imagefill($newPic,0,0,$white);
        switch ($picInfo[2])
        {
            case 1: $spic = imagecreatefromgif($pic);break;
            case 2: $spic = imagecreatefromjpeg($pic);break;
            case 3: $spic = imagecreatefrompng($pic);break;
            case 15: $spic = imagecreatefromwbmp($pic);break;
            default:exit('不支持为此类型图片添加水印');
        }
        imagecopy($newPic,$spic,0,0,0,0,$picInfo[0],$picInfo[1]);
        imagedestroy($spic);
        $waterPicInfo = getimagesize($waterPic);
        switch ($waterPicInfo[2])
        {
            case 1: $swaterPic = imagecreatefromgif($waterPic);break;
            case 2: $swaterPic = imagecreatefromjpeg($waterPic);break;
            case 3: $swaterPic = imagecreatefrompng($waterPic);break;
            case 15: $swaterPic = imagecreatefromwbmp($waterPic);break;
            default:exit('不支持此类型图片作为水印');
        }
        //将水印图片背景色设为透明色
        if ($this->waterPicBgcolor) imagecolortransparent($swaterPic,$this->getColor($this->waterPicBgcolor,$swaterPic));
        imagecopymerge($newPic,$swaterPic,$picInfo[0]-$waterPicInfo[0],$picInfo[1]-$waterPicInfo[1],0,0,$waterPicInfo[0],$waterPicInfo[1],$this->waterPct);
        imagedestroy($swaterPic);
        switch ($picInfo[2])
        {
            case 1: imagegif($newPic,$pic);break;
            case 2: imagejpeg($newPic,$pic);break;
            case 3: imagepng($newPic,$pic);break;
            case 6: imagexbm($newPic,$pic);break;
        }
        imagedestroy($newPic);
    }

    /**
     * -----------------------------
     * 生成缩略图
     * -----------------------------
     * @param  string $pic 原图片地址
     * @param  string $thumbPath 缩略图地址
     */
    private function imageThumb($pic,$thumbPath)
    {
        $picInfo = getimagesize($pic);
        switch ($picInfo[2])
        {
            case 1: $source = imagecreatefromgif($pic);break;
            case 2: $source = imagecreatefromjpeg($pic);break;
            case 3: $source = imagecreatefrompng($pic);break;
            case 15: $source = imagecreatefromwbmp($pic);break;
            default:exit('不支持为此类型图片生成缩略图');
        }
        $thumbWidth = $this->thumbMaxWidth;
        $thumbHeight = ceil($picInfo[1]*$thumbWidth/$picInfo[0]);
        if ($thumbHeight > $this->thumbMaxHeight) $thumbHeight = $this->thumbMaxHeight;
        $thumbWidth = ceil($picInfo[0]*$thumbHeight/$picInfo[1]);
        $thumb = imagecreatetruecolor($thumbWidth,$thumbHeight);
        imagecopyresized($thumb,$source,0,0,0,0,$thumbWidth,$thumbHeight,$picInfo[0],$picInfo[1]);
        imagejpeg($thumb,$thumbPath);
        imagedestroy($thumb);
    }

    /**
     * -----------------------------
     * 检查文件大小是否合法
     * -----------------------------
     * @param  int  $fileSize
     * @return bool
     */
    private function chkSize($fileSize)
    {
        return ($fileSize > 0 && $fileSize < $this->maxSize) ? true : false;
    }

    /**
     * -----------------------------
     * 判断文件后缀名是否合法
     * -----------------------------
     * @param  string $fileName
     * @return string
     */
    private function chkExt($fileName)
    {
        return in_array($this->getExt($fileName),$this->allowExt) ? true : false;
    }

    /**
     * -----------------------------
     * 检查文件类型是否合法
     * -----------------------------
     * @param  string  $fileType
     * @return bool
     */
    private function chkType($fileType)
    {
        return in_array($fileType,$this->allowType) ? true : false;
    }

    /**
     * -----------------------------
     * 获取文件后缀名
     * -----------------------------
     * @param  string $fileName
     * @return string
     */
    private function getExt($fileName)
    {
        $offset = strrpos($fileName,'.');
        if ($offset === false) return ;
        return strtolower(substr($fileName,$offset));
    }

    /**
     * -----------------------------
     * 获取上传后文件信息
     * -----------------------------
     * @return array  一维或二维数组
     */
    function getSaveFileInfo()
    {
        if (count($this->saveFileInfo) == 1)
        return array_shift($this->saveFileInfo);
        return $this->saveFileInfo;
    }

    /**
     * ------------------------------
     * 获取一个不存在的文件名
     * ------------------------------
     * @param  string $fileName
     * @return string
     */
    private function notExistsFileName($fileName)
    {
        $saveName = 1000 * microtime(true).mt_rand(10,99).$this->getExt($fileName);
        if (file_exists($saveName)) $saveName = $this->notExistsFileName($fileName);
        return $saveName;
    }

    /**
     * -----------------------------
     * 把十六进制色转为十进制色，并创建颜色
     * -----------------------------
     * @param  string $color 十六进制色（如：#fffff）
     * @param  string $image 要创建颜色的图像
     * @return resource 色资源
     */
    private static function getColor($color,$image)
    {
        $r = hexdec (substr($color,1,2));
        $b = hexdec (substr($color,3,2));
        $g = hexdec (substr($color,5,2));
        $color = imagecolorallocate ($image, $r, $b, $g);
        return $color;
    }
}
?>