<?php
/**
 * ------------------------------
 * mysqli基础操作类
 * ------------------------------
 * @author  张宏伟
 * @name    Mysql.class.php
 * @date    Thu Mar 11 16:45:04 CST 2010
 */
class Mysqli
{
    public $mysqli;
    /**
     * -----------------------------
     * 构造函数，连接数据库
     * -----------------------------
     * @param  array $DbConfig  数据库连接信息
     * @return bool
     */
    function __construct($DbConfig)
    {
        @$this->mysqli = new mysqli($DbConfig['hostname'],$DbConfig['username'],$DbConfig['password'],$DbConfig['database']);
        @$this->mysqli->set_charset($DbConfig['charset']);
        if (mysqli_connect_errno() != 0)
        {
            echo '连接失败，错误编码'.mysqli_connect_errno().'<br>';
            echo '错误信息'.mysqli_connect_error();
            exit;
        }
    }
    /**
     * -----------------------------
     * 查询，只返回第一个结果
     * -----------------------------
     * @param  string $sql  sql语句
     * @return array
     */
    function select_one($sql)
    {
        $rs = $this->mysqli->query($sql);
        if($rs && $rs->num_rows>0)
        {
            $date = $rs->fetch_assoc();
            return $date;
        }
        return false;
    }
    /**
     * -----------------------------
     * 查询数据
     * -----------------------------
     * @param  string $sql sql语句
     * @return array  二维数组
     */
    function select($sql = '')
    {
        $rs = $this->mysqli->query($sql);
        $data = array();
        if($rs && $rs->num_rows>0)
        {
            while($row = $rs->fetch_assoc())
            {
                $data[] = $row;
            }
            return $data;
        }
        return false;
    }
    /**
     * -----------------------------
     * 插入数据
     * -----------------------------
     * @param  string $tbname  表名
     * @param  array  $arr  要插入的数据
     * @return bool
     */
    function insert($tbname,$arr)
    {
        $key = '';
        $value = '';
        foreach($arr as $k=>$v)
        {
            $key.=$k.",";
            $value.="'".$v."',";
        }
        $key = substr($key,0,-1);
        $value=substr($value,0,-1);
        $sql="insert into $tbname($key) values($value)";
        if($this->mysqli->query($sql))
        {
            return true;
        }
        return false;
    }
    /**
     * -----------------------------
     * 更新数据
     * -----------------------------
     * @param  string $tbname  表名
     * @param  array  $arr     要更新的数据
     * @param  string $where   要更新的地方
     * @return bool
     */
    function update($tbname,$arr,$where)
    {
        $str = '';
        foreach ($arr as $k=>$v)
        {
            $str.= $k."='".$v."',";
        }
        $str = substr($str,0,-1);
        $sql = "update $tbname set $str where $where";
        if($this->mysqli->query($sql))
        {
            return true;
        }
        return false;
    }
    /**
     * -----------------------------
     * 删除一条数据
     * -----------------------------
     * @param  string $tbname  表名
     * @param  string $where   要删除的地方
     * @return bool
     */
    function delete($tbname,$where)
    {
        $sql = "delete from $tbname where $where";
        if ($this->mysqli->query($sql))
        {
            return true;
        }
        return false;
    }
    /**
     * -----------------------------
     * 删除一组数据
     * -----------------------------
     * @param  string $tbname  表名
     * @param  string $key     作为标准的字段
     * @param  array  $arr     要删除的地方
     * @return bool
     */
    function delete_rows($tbname,$key,$arr)
    {
        $str = '';
        foreach ($arr as $v)
        {
            $str.= "'".$v."',";
        }
        $str = substr($str,0,-1);
        $sql = "delete from $tbname where $key in ($str)";
        if ($this->mysqli->query($sql))
        {
            return true;
        }
        return false;
    }
    /**
     * -----------------------------
     * 查询数据条数
     * -----------------------------
     * @param  string $tbname   表名
     * @param  string[optional] $where    限制条件(默认为全部)
     * @return int
     */
    function num_rows($tbname,$where='1=1')
    {
        $sql = "select count(*) as 'num' from $tbname where $where";
        if($rs=$this->mysqli->query($sql))
        {
            $row = $rs->fetch_assoc();
            return $row['num'];
        }
        return $this->mysqli->error;
    }
    /**
     * -----------------------------
     * 关闭数据库连接
     * -----------------------------
     */
    function __destruct()
    {
        @$this->mysqli->close();
    }
}
?>