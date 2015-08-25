<?php
/**
 * ------------------------------
 * 文件上传类
 * ------------------------------
 * @name    UpFile.class.php
 * @version 2010.04.06
 * @author  张宏伟
 * @date    Tue Apr 06 23:15:56 CST 2010
 */

class UpFile
{
    //上传目录
    var $upPath = '';
    //上传后的文件信息
    var $saveFileInfo = array();
    //允许上传文件的最大值(默认1M)
    var $maxSize;
    //允许上传的文件后缀名
    var $allowExt;
    //默认允许上传的文件类型
    var $allowType;
    
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
        $this->allowExt = ($allowExt == '') ? array('jpg','jpeg','gif','png','bmp') : $allowExt;
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
        //把上传框构造成数组
        if(gettype($file) == 'string') $file = array($file);
        
        for ($i = 0;$i < count($file);$i++)
        {
            //如果上传文件没有出现错误
            if ($_FILES[$file[$i]]['error'] == 0)
            {
                //获取当前文件名、文件大小、文件类型、临时文件名
                $fileName = $_FILES[$file[$i]]['name'];
                $fileSize = $_FILES[$file[$i]]['size'];
                $fileType = $_FILES[$file[$i]]['type'];
                $tmpName = $_FILES[$file[$i]]['tmp_name'];
                //判断文件大小是否合法
                if (!$this->chkSize($fileSize))
                {
                    $this->saveFileInfo[$i]['upError'] = '文件'.$fileName.'的大小超过允许';
                    continue;
                }
                //判断文件后缀是否合法
                if (!$this->chkExt($fileName))
                {
                    $this->saveFileInfo[$i]['upError'] = '文件'.$fileName.'的后缀不合法';
                    continue;
                }
                //判断文件类型是否合法
                if (!$this->chkType($fileType))
                {
                    $this->saveFileInfo[$i]['upError'] = '文件'.$fileName.'的类型超出允许';
                    continue;
                }
                //创建上传目录
                @mkdir($this->upPath,0700,true);
                //定义上传以后的文件名和文件保存路径
                $saveName = $this->getNamePart($fileName).' - '.time().mt_rand(10,99).'.'.$this->getExt($fileName);
                $savePath = $this->upPath.$saveName;
                //把文件移动到指定的目录
                if (!move_uploaded_file($tmpName,$savePath))
                {
                    $this->saveFileInfo[$i]['upError'] = '文件'.$fileName.'无法移动';
                    continue;
                }
                //存储已经上传的文件信息
                $this->saveFileInfo[$i] = array(
                'fileName' => $fileName,
                'fileSize' => $fileSize,
                'fileType' => $fileType,
                'saveName' => $saveName,
                'savePath' => $savePath,
                );
            }
        }
    }

    /**
     * -----------------------------
     * 检查文件大小是否合法
     * -----------------------------
     * @param  int  $fileSize
     * @return bool
     */
    function chkSize($fileSize)
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
    function chkExt($fileName)
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
    function chkType($fileType)
    {
        return in_array($fileType,$this->allowType) ? true : false;
    }
    
    /**
     * -----------------------------
     * 获取文件名除后缀的部分
     * -----------------------------
     * @param  string  $fileName
     * @return string
     */
    function getNamePart($fileName)
    {
        return base64_encode(@substr($fileName,0,strrpos($fileName,'.')));
    }
    
    /**
     * -----------------------------
     * 获取文件后缀名
     * -----------------------------
     * @param  string $fileName
     * @return string
     */
    function getExt($fileName)
    {
        $ext = pathinfo($fileName);
        return strtolower(@$ext['extension']);
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
        {
            return array_shift($this->saveFileInfo);
        }
        else 
        {
            return $this->saveFileInfo;
        }
    }
}
?>