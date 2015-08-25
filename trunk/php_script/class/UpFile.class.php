<?php
/**
 * ------------------------------
 * 文件上传类
 * ------------------------------
 * @name    UpFile.class.php
 * @version 2010.06.03
 * @author  张宏伟
 */

class UpFile
{
    private $upPath = '';                   //上传目录
    private $saveFileInfo = array();        //上传后的文件信息
    private $maxSize;                       //允许上传文件的最大值(默认1M)
    private $allowExt;                      //允许上传的文件后缀名
    private $allowType;                     //默认允许上传的文件类型

    /**
     * -----------------------------
     * 构造函数
     * -----------------------------
     * @param  string $upPath        上传路径
     * @param  int $maxSize          上传文件大小最大值(M为单位)
     * @param  array $allowExt       允许上传的文件后缀
     * @param  array $allowType      允许上传的文件mine类型
     */
    function __construct($upPath='',$maxSize=2,$allowExt='',$allowType='')
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
        $saveName = $this->noExistsFileName($fileName);
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
    function noExistsFileName($fileName)
    {
        $saveName = 1000 * microtime(true).mt_rand(10,99).$this->getExt($fileName);
        if (file_exists($saveName)) $saveName = $this->noExistsFileName($fileName);
        return $saveName;
    }
}
?>