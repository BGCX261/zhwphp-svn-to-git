<?php
/**
 * ------------------------------
 * ����������  <mail@zhwphp.com>
 * ------------------------------
 * @name    UpFile.class.php
 * @version Wed Aug 04 15:02:27 CST 2010
 * @author  �ź�ΰ
 */

class UpFile
{
    /**
     * �ϴ�Ŀ¼
     * @var string
     */
    private $upPath = '';
    /**
     * �����ϴ��ļ������ֵ(Ĭ��1M)
     * @var int
     */
    private $maxSize;
    /**
     * Ĭ�������ϴ����ļ���mime����
     * @var array
     */
    private $allowType = array();
    /**
     * �ϴ�����ļ���Ϣ
     * @var array
     */
    private $saveInfo = array();
    /**
     * �ϴ������� 
     * @var string
     */
    private $inputName = '';
    /**
     * �ϴ��ļ���Ϣ
     * @var array
     */
    private $uploadInfo = array();

    /**
     * -----------------------------
     * ���캯��
     * -----------------------------
     * @param  string $upPath        �ϴ�·��
     * @param  int $maxSize          �ϴ��ļ����ֵ(K)
     * @param  array $allowType      �����ϴ����ļ�mine����=>��׺
     */
    function __construct($upPath='',$maxSize=1024,$allowType='')
    {
        $this->upPath = ($upPath == '') ? $this->defaultUpPath() : $this->pathFormat($upPath);
        $this->maxSize = $maxSize * 1024;
        $this->allowType = ($allowType == '') ? $this->defaultAllowType() : $allowType;
    }
    
    //Ĭ���ϴ�·��
    private function defaultUpPath()
    {
        return $this->pathFormat("upLoad/".date('Y-m')."/".date('d').'/');
    }

    //Ĭ�������ϴ�����
    private function defaultAllowType()
    {
        return array('image/jpeg'=>'jpg','image/pjpeg'=>'jpg','image/gif'=>'gif','image/x-png'=>'png',
        'image/png'=>'png','application/x-shockwave-flash'=>'swf');
    }

    //�����ϴ�·��
    public function setUpPath($path)
    {
        $this->upPath = $this->pathFormat($path);
    }
    
    //���������ļ���С
    public function setMaxSize($maxSize)
    {
        $this->maxSize = $maxSize * 1024;
    }

    //���������ϴ�����
    public function setAllowType($allowType)
    {
        $this->allowType = $allowType;
    }

    //���ļ��ϴ�
    public function upload($inputName,$saveName='')
    {
        $this->inputName = $inputName;
        $this->uploadInfo[$this->inputName] = $_FILES[$this->inputName];
        $this->uploadInfo[$this->inputName]['save_name'] = $saveName;
        $this->validate();
    }

    //��֤�ϴ��ļ�
    private function validate()
    {
        extract($this->uploadInfo[$this->inputName]);
        if ($error != 0)
        {
            if ($error == 1 || $error ==2) $this->error('��С����ϵͳ����');
            elseif ($error == 3) $this->error('ֻ�в��ֱ��ϴ�');
            elseif ($error == 4) $this->error('û���ļ��ϴ�');
            return false;
        }
        if (!$this->chkSize()) {$this->error('��С�γ����� '.$this->byteFormat($this->maxSize*1024));return false;}
        if (!$this->chkType()) {$this->error('���ͳ����������������ͣ�'.$this->getAllowExt());return false;}
        if (!is_uploaded_file($this->getUploadInfo('tmp_name')))
        {
            $this->error('�Ƿ��ϴ��ļ�����ɾ��');
            @unlink($this->getUploadInfo('tmp_name'));
            return false;
        }
    }

    //�ƶ��ļ�
    private function move()
    {
        if (!is_dir($this->upPath)) mkdir($this->upPath,0755,true);
        $this->setSaveInfo('saveName',$this->getSaveName());
        $this->setSaveInfo('savePath',$this->upPath.$this->getSaveInfo('saveName'));
        if (!move_uploaded_file($this->getUploadInfo('tmp_name'),$this->getSaveInfo('savePath')))
        {
            $this->error('�ļ��޷��ƶ�');
            return false;
        }
        $this->setSaveInfo('fileName',$this->getUploadInfo('name'));
        $this->setSaveInfo('fileSize',$this->getUploadInfo('size'));
        $this->setSaveInfo('fileType',$this->getUploadInfo('type'));
        return true;
    }

    //����ļ���С�Ƿ�Ϸ�
    private function chkSize()
    {
        $fileSize = $this->getUploadInfo('size');
        return ($fileSize > 0 && $fileSize < $this->maxSize) ? true : false;
    }

    //����ļ������Ƿ�Ϸ�
    private function chkType()
    {
        $fileType = $this->getUploadInfo('type');
        return isset($this->allowType[$fileType]) ? true : false;
    }

    //��ȡ�ļ���׺��
    private function getExt()
    {
        return $this->allowType[$this->getUploadInfo('type')];
    }

    //��������ϴ��ļ���׺
    public function getAllowExt()
    {
        $allowExt = '';
        foreach (array_unique($this->allowType) as $v)
        {
            $allowExt .= $v.',';
        }
        return substr($allowExt,0,-1);
    }

    //��ȡ��ǰ�ϴ��ļ���Ϣ
    private function getUploadInfo($var)
    {
        return $this->uploadInfo[$this->inputName][$var];
    }

    private function setSaveInfo($var,$val='')
    {
        $this->saveInfo[$this->inputName][$var] = $val;
    }

    public function getSaveInfo($var='all',$inputName='')
    {
        if ($var == 'all')
        {
            if (!$inputName) return $this->saveInfo;
            return $this->saveInfo[$inputName];
        }
        if (!$inputName) return $this->saveInfo[$this->inputName];
        return $this->saveInfo[$this->inputName][$var];
    }

    //��ʽ��·��
    private function pathFormat($path)
    {
        if (substr($path,-1) != '/') $path .= '/';
        return $path;
    }

    //��ʽ���ļ���С
    private function  byteFormat($size,$dec=2)
    {
        $a = array("B", "KB", "MB", "GB", "TB", "PB");
        $pos = 0;
        while ($size >= 1024)
        {
            $size /= 1024;
            $pos++;
        }
        return round($size,$dec)." ".$a[$pos];
    }

    //��ñ����ļ���
    private function getSaveName()
    {
        $saveName = $this->getUploadInfo('save_name');
        if (empty($saveName)) $saveName = $this->notExistsFileName();
        else $saveName .= '.'.$this->getExt();
        return $saveName;
    }

    //����һ�������ڵ��ļ���
    private function notExistsFileName()
    {
        $saveName = time().mt_rand(1000,9999).'.'.$this->getExt();
        if (file_exists($saveName)) $saveName = $this->notExistsFileName();
        return $saveName;
    }

    //�������
    private function error($error)
    {
        $this->setSaveInfo('error',"�ļ�����{$this->getUploadInfo('name')}\r\n����{$error}");
    }
}
?>