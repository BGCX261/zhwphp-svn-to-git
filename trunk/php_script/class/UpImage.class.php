<?php
/**
 * ------------------------------
 * ͼƬ�ϴ��ࣨ����������ͼ��ˮӡ��
 * ------------------------------
 * @name    UpImage.class.php
 * @version 2010.06.27
 * @author  �ź�ΰ
 */

class UpImage
{
    /**
     * �ϴ�Ŀ¼
     * @var string
     */
    private $upPath = '';
    /**
     * �ϴ�����ļ���Ϣ
     * @var array
     */
    private $saveFileInfo = array();
    /**
     * �����ϴ��ļ������ֵ(Ĭ��1M)
     * @var int
     */
    private $maxSize;
    /**
     * �����ϴ����ļ���׺��
     * @var array
     */
    private $allowExt;
    /**
     * Ĭ�������ϴ����ļ���mime����
     * @var array
     */
    private $allowType;
    /**
     * ����ˮӡͼƬ��ˮӡͼƬ·����
     * @var string
     */
    public  $waterPic;
    /**
     * ˮӡ͸���ȣ�0-100��
     * @var int
     */
    public  $waterPct = 50;
    /**
     * ˮӡͼƬ������ɫ������Ϊ͸����
     * @var string
     */
    public  $waterPicBgcolor = '#ffffff';
    /**
     * �Ƿ���������ͼ
     * @var bool
     */
    public  $thumb = false;
    /**
     * ����ͼ������
     * @var int
     */
    public  $thumbMaxWidth = 120;
    /**
     * ����ͼ���߶�
     * @var int
     */
    public  $thumbMaxHeight = 120;

    /**
     * -----------------------------
     * ���캯��
     * -----------------------------
     * @param  string $upPath        �ϴ�·��
     * @param  int $maxSize          �ϴ��ļ���С���ֵ(MΪ��λ)
     * @param  array $allowExt       �����ϴ����ļ���׺
     * @param  array $allowType      �����ϴ����ļ�mine����
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
     * �ϴ�����
     * -----------------------------
     * @param  array/string  $file   �ϴ�������
     */
    function UpLoad($file)
    {
        //����ϴ���������������$images[]
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
        //����ϴ���������������array('image1','image2')�򵥸��ַ���'image';
        else
        {
            if (!is_array($file)) $file = array($file);
            foreach ($file as $k => $v)
            {
                if (is_array($_FILES[$v]['name'])) exit('��֧���������ϴ���ʽ��');
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
     * �ж��ϴ�״̬���ϴ��ļ�����
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
            $this->saveFileInfo[$k]['error'] = '�ļ���'.$fileName.'����С��������';
            elseif ($error == 3)
            $this->saveFileInfo[$k]['error'] = '�ļ���'.$fileName.'��ֻ���ֱ��ϴ�';
            elseif ($error == 4)
            $this->saveFileInfo[$k]['error'] = 'û���ļ��ϴ�';
            return false;
        }
        if (!$this->chkExt($fileName))
        {
            $this->saveFileInfo[$k]['error'] = '�ļ���'.$fileName.'����׺������';
            return false;
        }
        if (!$this->chkSize($fileSize))
        {
            $this->saveFileInfo[$k]['error'] = '�ļ���'.$fileName.'���Ĵ�С��������';
            return false;
        }
        if (!$this->chkType($fileType))
        {
            $this->saveFileInfo[$k]['error'] = '�ļ���'.$fileName.'�������ͳ�������';
            return false;
        }
        @mkdir($this->upPath,0755,true);
        $saveName = $this->notExistsFileName($fileName);
        $savePath = $this->upPath.$saveName;
        if (!is_uploaded_file($tmpName))
        {
            $this->saveFileInfo[$k]['error'] = '��'.$tmpName.'�����ǺϷ����ϴ��ļ�';
            return false;
        }
        if (!move_uploaded_file($tmpName,$savePath))
        {
            $this->saveFileInfo[$k]['error'] = '�ļ���'.$fileName.'���޷��ƶ�';
            return false;
        }
        //����ˮӡ
        if ($this->waterPic) $this->imageWater($savePath,$this->waterPic);
        //��������ͼ
        if ($this->thumb) $this->imageThumb($savePath,$savePath.'_thumb.jpg');
        //�洢�Ѿ��ϴ����ļ���Ϣ
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
     * ���ϴ���ͼƬ����ˮӡ
     * -----------------------------
     * @param  string $pic Ҫ����ˮӡ��ͼƬ
     * @param  string $waterPic ˮӡͼƬ
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
            default:exit('��֧��Ϊ������ͼƬ����ˮӡ');
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
            default:exit('��֧�ִ�����ͼƬ��Ϊˮӡ');
        }
        //��ˮӡͼƬ����ɫ��Ϊ͸��ɫ
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
     * ��������ͼ
     * -----------------------------
     * @param  string $pic ԭͼƬ��ַ
     * @param  string $thumbPath ����ͼ��ַ
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
            default:exit('��֧��Ϊ������ͼƬ��������ͼ');
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
     * ����ļ���С�Ƿ�Ϸ�
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
     * �ж��ļ���׺���Ƿ�Ϸ�
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
     * ����ļ������Ƿ�Ϸ�
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
     * ��ȡ�ļ���׺��
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
     * ��ȡ�ϴ����ļ���Ϣ
     * -----------------------------
     * @return array  һά���ά����
     */
    function getSaveFileInfo()
    {
        if (count($this->saveFileInfo) == 1)
        return array_shift($this->saveFileInfo);
        return $this->saveFileInfo;
    }

    /**
     * ------------------------------
     * ��ȡһ�������ڵ��ļ���
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
     * ��ʮ������ɫתΪʮ����ɫ����������ɫ
     * -----------------------------
     * @param  string $color ʮ������ɫ���磺#fffff��
     * @param  string $image Ҫ������ɫ��ͼ��
     * @return resource ɫ��Դ
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