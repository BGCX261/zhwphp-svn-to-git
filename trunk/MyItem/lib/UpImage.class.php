<?php
/**
 * ------------------------------
 * 图片上传操作类(只支持单图片)
 * ------------------------------
 * @name    UpImage.class.php
 * @version 2010.04.07
 * @author  张宏伟
 * @date    Wed Apr 07 23:52:44 CST 2010
 */

class UpImage extends UpFile 
{
    //db类对象
    var $db;
    //要操作的表
    var $tbname;
    //上传框名称
    var $file;
    //返回信息
    var $returnMsg = '操作结果：';
    
    /**
     * -----------------------------
     * 构造函数
     * -----------------------------
     * @param  Object $db;      db类对象
     * @param  string $tbname;  要操作的表
     * @param  string $file     上传框的name
     */
    function __construct($db,$tbname,$file,$upPath='',$maxSize=2,$allowExt='',$allowType='')
    {
        $this->db = $db;
        $this->tbname = $tbname;
        $this->file = $file;
        $this->upPath = ($upPath == '') ? "upLoad/".date('Y')."/".date('m')."/" : $upPath;
        $this->maxSize = $maxSize * 1024 * 1024;
        $this->allowExt = ($allowExt == '') ? array('jpg','jpeg','gif','png','bmp') : $allowExt;
        $this->allowType = ($allowType == '') ? array('image/jpeg','image/pjpeg','image/gif','image/x-png','image/bmp') : $allowType;
    }
    
    /**
     * -----------------------------
     * 添加图片信息
     * -----------------------------
     * @param  string $key_image 插入数据库中的图片路径的字段
     * @param  array  $arr  其它要插入数据库的数据
     */
    function addImage($key_image,$arr='')
    {
        $arr[$key_image] = $this->getImageSavePath();        
        $rs = $this->db->row_insert($this->tbname,$arr);
        $this->returnMsg .= $rs ? '\r\n数据添加成功！' : '\r\n数据添加失败！';
    }
    
    /**
     * -----------------------------
     * 更新图片信息
     * -----------------------------
     * @param  string $key_image 插入数据库中的图片路径的字段
     * @param  array  $arr  其它要插入数据库的数据
     * @param  string $where  图片定位条件
     * @param  bool $unlink  是否删除原图片（默认删除）
     */
    function updateImage($key_image,$arr='',$where,$unlink='true')
    {
        $rs = $this->db->row_query_one("SELECT * FROM $this->tbname WHERE $where");
        $str = substr($rs[$key_image],-11,7);
        $imagePath = $this->getImageSavePath();
        $arr[$key_image] = ($imagePath == '' ? $rs[$key_image] : $imagePath);        
        $rs_update = $this->db->row_update($this->tbname,$arr,$where);
        if ($rs_update)
        {
            if($unlink != false && $imagePath != '' && $str != 'default') @unlink($rs[$key_image]);
            $this->returnMsg .= '\r\n数据更新成功！';
        }
        else 
        {
            $this->returnMsg .= '\r\n数据更新失败！';
        }
    }
    
    /**
     * -----------------------------
     * 删除图片记录信息
     * -----------------------------
     * @param  string $key_image 插入数据库中的图片路径的字段
     * @param  string $where  图片定位条件
     * @param  bool $unlink  是否删除原图片（默认删除）
     */
    
    function delImage($key_image,$where,$unlink='true')
    {
        if($unlink != false) $this->unlinkImage($key_image,$where);
        $rs = $this->db->row_delete($this->tbname,$where);
        $this->returnMsg .= ($rs ? '\r\n删除数据成功！' : '\r\n删除数据失败！');
    }
    
    /**
     * -----------------------------
     * 获得图片保存路径
     * -----------------------------
     * @return string/false  图片保存路径或false
     */
    function getImageSavePath()
    {
        $this->UpLoad($this->file);
        $saveFileInfo = $this->getSaveFileInfo();
        if (isset($saveFileInfo['upError']))
        {
            $this->returnMsg .= '\r\n图片上传失败！'.$saveFileInfo['upError'];
            return '';
        }
        $this->returnMsg .= '\r\n图片上传成功！';
        return $saveFileInfo['savePath'];
    }
    
    /**
     * -----------------------------
     * 删除一张非默认图片(default.XXX)
     * -----------------------------
     * @param  string $key_image 插入数据库中的图片路径的字段
     * @param  string $where  图片定位条件
     * @return bool
     */
    function unlinkImage($key_image,$where)
    {
        $rs = $this->db->row_query_one("SELECT * FROM $this->tbname WHERE $where");
        $str = substr($rs[$key_image],-11,7);
        if ($str != 'default')
        {
            @unlink($rs[$key_image]);
            if(file_exists($rs[$key_image]))
            {
                $this->returnMsg.'\r\n删除图片失败！';
                return false;
            }
            else 
            {
                $this->returnMsg.'\r\n删除图片成功！';
                return true;
            }
        }
        return true;
    }
}
?>