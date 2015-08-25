<?php
/**
 * ------------------------------
 * �ļ��ϴ���
 * ------------------------------
 * @name    UpFile.class.php
 * @version 2010.06.03
 * @author  �ź�ΰ
 */

class UpFile
{
    private $upPath = '';                   //�ϴ�Ŀ¼
    private $saveFileInfo = array();        //�ϴ�����ļ���Ϣ
    private $maxSize;                       //�����ϴ��ļ������ֵ(Ĭ��1M)
    private $allowExt;                      //�����ϴ����ļ���׺��
    private $allowType;                     //Ĭ�������ϴ����ļ�����

    /**
     * -----------------------------
     * ���캯��
     * -----------------------------
     * @param  string $upPath        �ϴ�·��
     * @param  int $maxSize          �ϴ��ļ���С���ֵ(MΪ��λ)
     * @param  array $allowExt       �����ϴ����ļ���׺
     * @param  array $allowType      �����ϴ����ļ�mine����
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
        $saveName = $this->noExistsFileName($fileName);
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
    function noExistsFileName($fileName)
    {
        $saveName = 1000 * microtime(true).mt_rand(10,99).$this->getExt($fileName);
        if (file_exists($saveName)) $saveName = $this->noExistsFileName($fileName);
        return $saveName;
    }
}
?>