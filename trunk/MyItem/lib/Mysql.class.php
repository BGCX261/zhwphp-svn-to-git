<?php
/**
 * ------------------------------
 * mysql操作类
 * ------------------------------
 * @name    Mysql.class.php
 * @version 2010.04.15
 * @author  张宏伟
 */

!defined('DB_ERROR') && exit('Please define DB_ERROR');

class Mysql
{
    //数据库连接符
    protected $connection_id = '';
    //sql执行结果
    protected $query_result;
    //sql执行次数
    protected $query_count = 0;
    //是否开启错误信息
    protected $error_message = DB_ERROR;

    /**
     * ------------------------------
     * 构造函数，连接数据库
     * ------------------------------
     * @param  array $db_config 数据库连接信息
     * @param  int $pconnect 是否使用长连接，默认否
     * @return resource
     */
    function __construct($db_config,$pconnect = 0)
    {
        !extension_loaded('mysql') && exit('mysql do not exist!');
        
        $connect_type = $pconnect ? 'mysql_pconnect' : 'mysql_connect';
        if(!isset($db_config['DB_PORT']))  $db_config['DB_PORT'] = 3306;
        if(!isset($db_config['DB_CHARSET']))  $db_config['DB_CHARSET'] = 'utf8';
        $this->connection_id = $connect_type($db_config["DB_HOST"].':'.$db_config['DB_PORT'], $db_config["DB_USER"], $db_config["DB_PASS"]);
        if (!$this->connection_id)
        {
            $this->halt("Can not connect MySQL Server");
        }
        if (!@mysql_select_db($db_config["DB_NAME"], $this->connection_id))
        {
            $this->halt("Can not connect MySQL Database");
        }
        if ($db_config["DB_CHARSET"])
        {
            @mysql_unbuffered_query("SET NAMES '".$db_config["DB_CHARSET"]."'");
        }
        return true;
    }

    /**
     * ------------------------------
     * 发送SQL 查询，并返回结果集
     * ------------------------------
     * @param  string $sql sql语句
     * @return resource/bool
     */
    function query($sql,$query_type = 'mysql_query')
    {
        $this->query_result = $query_type($sql,$this->connection_id);
        if (!$this->query_result)
        {
            $this->halt($this->get_error($sql));
        }
        $this->query_count++;
        return $this->query_result;
    }

    /**
     * ------------------------------
     * 发送SQL 查询，并不获取和缓存结果的行
     * ------------------------------
     * @param  string $sql sql语句
     * @return resource/bool
     */
    function query_unbuffered($sql)
    {
        return $this->query($sql,'mysql_unbuffered_query');
    }

    /**
     * ------------------------------
     * 从结果集中取得一行作为关联数组（表字段为数组下标）
     * ------------------------------
     * @param  resource $query_result sql执行结果
     * @return array
     */
    function fetch_array($query_result = '')
    {
        if ($query_result == '') $query_result = $this->query_result;
        return @mysql_fetch_assoc($query_result);
    }

    /**
     * ------------------------------
     * 取得结果集中行的数目，仅对 INSERT，UPDATE 或者 DELETE
     * ------------------------------
     * @param  resource $query_result sql执行结果
     * @return int
     */
    function affected_rows($query_result)
    {
        if ($query_result == '') $query_result = $this->query_result;
        return @mysql_affected_rows($query_result);
    }

    /**
     * ------------------------------
     * 取得结果集中行的数目，仅对 SELECT 语句有效
     * ------------------------------
     * @param  resource $query_result sql执行结果
     * @return int
     */
    function num_rows($query_result)
    {
        if ($query_result == '') $query_result = $this->query_result;
        return @mysql_num_rows($query_result);
    }

    /**
     * ------------------------------
     * 返回上一个MySQL操作中的错误信息
     * ------------------------------
     * @return string
     */
    function get_error($msg = '')
    {
        $error = '';
        $error .= '错误编码：'.@mysql_errno($this->connection_id)."\r\n";
        $error .= '错误信息：'.@mysql_error($this->connection_id)."\r\n";
        $error .= $msg ? '错误语句'.$msg : '';
        return $error;
    }

    /**
     * ------------------------------
     * 取得上一步 INSERT 操作产生的自动增长的ID
     * ------------------------------
     * @return int
     */
    function insert_id()
    {
        return @mysql_insert_id($this->connection_id);
    }

    /**
     * ------------------------------
     * 得到查询次数
     * ------------------------------
     * @return int
     */
    function query_count()
    {
        return $this->query_count;
    }

    /**
     * ------------------------------
     * 释放结果内存
     * ------------------------------
     * @param  resource $query_result sql执行结果
     * @return bool
     */
    function free_result($query_result = '')
    {
        if ($query_result == '') $query_result = $this->query_result;
        @mysql_free_result($query_result);
    }

    /**
     * ------------------------------
     * 关闭 MySQL 连接
     * ------------------------------
     * @return bool
     */
    function close_db()
    {
        if ($this->connection_id) return @mysql_close($this->connection_id);
    }

    /**
     * ------------------------------
     * 取得数据库中所有的表
     * ------------------------------
     * @return array
     */
    function get_table_names()
    {
        global $db_config;
        $result = mysql_list_tables($db_config["DB_NAME"]);
        $num_tables = @mysql_num_rows($result);
        for ($i = 0; $i < $num_tables; $i++) {
            $tables[] = mysql_tablename($result, $i);
        }
        mysql_free_result($result);
        return $tables;
    }

    /**
     * ------------------------------
     * 取得表中所有字段信息
     * ------------------------------
     * @param  string $tbname 表名
     * @return array
     */
    function get_table_info($tbname,$onlyFiled = 0)
    {
        $tbFiled = array();
        $tbInfo = $this->row_query('DESCRIBE '.$tbname);
        if (count($tbInfo) <= 0) $this->halt($this->get_errno());
        if (!$onlyFiled) return $tbInfo;
        foreach ($tbInfo as $v)
        {
            $tbFiled[] = $v['Field'];
        }
        return $tbFiled;
    }
    
    /**
     * -----------------------------
     * 优化表
     * -----------------------------
     * @param  string/array $tbName 表名
     * @return bool
     */
    function optimize_table($tbName)
    {
        if (is_array($tbName))
        {
            $tb = '';
            foreach ($tbName as $v)
            {
                $tb .= '`'.$v.'`,';
            }
            $tb = substr($tb,0,-1);
        }
        else 
        {
            $tb = '`'.$tbName.'`';
        }
        return $this->query("OPTIMIZE TABLE $tb");
    }

    /**
     * ------------------------------
     * 从结果集中取得列信息并作为对象返回，取得所有字段
     * ------------------------------
     * @param  resource $query_result sql执行结果
     * @return array
     */
    function get_result_fields($query_result = '')
    {
        if ($query_result == '') $query_result = $this->query_result;
        while ($field = mysql_fetch_field($query_result))
        {
            $fields[] = $field;
        }
        return $fields;
    }

    /**
     * ------------------------------
     * 错误提示
     * ------------------------------
     * @param  string $the_error 错误提示
     */
    function halt($message = '')
    {
        if ($this->error_message)
        {
            $message = "MySQL错误：\r\n".$message;
            echo "<html><head><title>MySQL 数据库错误</title>";
            echo "<style type=\"text/css\"><!–.error { font: 11px tahoma, verdana, arial, sans-serif, simsun; }–></style></head>\r\n";
            echo "<body>\r\n";
            echo "<blockquote>\r\n";
            echo "<textarea class=\"error\" rows=\"15\" cols=\"80\" wrap=\"on\" >" . htmlspecialchars($message) . "</textarea>\r\n";
            echo "</blockquote>\r\n</body></html>";
        }
        exit;
    }

    function __destruct()
    {
        $this->close_db();
    }

    /***********************  以下是普通的CURD的sql语句的构造  **************************/

    function sql_select($tbname, $where='', $fields='*', $limit=0, $orderBy='', $sort='DESC')
    {
        $sql = "SELECT $fields FROM `".$tbname.'`'.($where ? ' WHERE '.$where : '').($orderBy ? ' ORDER BY `'.$orderBy.'` '.$sort : '').($limit ? ' LIMIT '.$limit : '');
        return $sql;
    }

    function sql_insert($tbname, $row)
    {
        $sql_field = $sql_value = '';
        foreach ($row as $key=>$value)
        {
            $sql_field .= '`'.$key.'`,';
            $sql_value .= "'".$value."',";
        }
        return 'INSERT INTO `'.$tbname.'`('.substr($sql_field, 0, -1).') VALUES ('.substr($sql_value, 0, -1).')';
    }

    function sql_update($tbname, $row, $where)
    {
        $sqlud = '';
        foreach ($row as $key=>$value)
        {
            $sqlud .= '`'.$key."`='".$value."',";
        }
        return "UPDATE `".$tbname."` SET ".substr($sqlud, 0, -1)." WHERE ".$where;
    }

    function sql_delete($tbname, $where)
    {
        return 'DELETE FROM `'.$tbname.'` WHERE '.$where;
    }

    /*************************   以下是CURD操作  ***********************/

    /**
     * ------------------------------
     * 添加一条记录
     * ------------------------------
     * @param  string $tbname 名表
     * @param  array $row 数据数组
     * @return bool
     */
    function row_insert($tbname, $row)
    {
        $sql = $this->sql_insert($tbname, $row);
        return $this->query_unbuffered($sql);
    }

    /**
     * ------------------------------
     * 添加相同结构多条记录
     * ------------------------------
     * @param  string $tbname 名表
     * @param  array $row 数据表字段与数据数组字段对应关系
     * @param  array $data 二维数据数组
     * @return bool
     * @example 
     * $row = array
     * (
     *     '表字段1'=>array('数据1','数据2',...),
     *     '表字段2'=>array('数据1','数据2',...)
     * );
     */
    function insert_row($tbname,$row)
    {
        $sql_field = $sql_value = '';
        $arr_value = array();
        foreach ($row as $key=>$val)
        {
            $sql_field .= '`'.$key.'`,';
            $num  = count($val);
            for ($i = 0; $i < $num; $i++)
            {
                $arr_value[$i][] = $val[$i];
            }
        }
        foreach ($arr_value as $arr)
        {
            $str_value = '';
            foreach ($arr as $v)
            {
                $str_value .= "'".$v."',";
            }
            $sql_value .= '('.substr($str_value,0,-1).'),';
        }
        $sql = 'INSERT INTO `'.$tbname.'`('.substr($sql_field, 0, -1).') VALUES '.substr($sql_value, 0, -1);
        return $this->query_unbuffered($sql);
    }

    /**
     * ------------------------------
     * 更新指定记录
     * ------------------------------
     * @param  string $tbname 表名
     * @param  array $row 数据数组
     * @param  string $where 定位条件
     * @return bool
     */
    function row_update($tbname, $row, $where)
    {
        $sql = $this->sql_update($tbname, $row, $where);
        return $this->query_unbuffered($sql);
    }

    /**
     * ------------------------------
     * 删除满足条件的记录
     * ------------------------------
     * @param  string $tbname 表名
     * @param  string $where 定位条件
     * @return bool
     */
    function row_delete($tbname, $where)
    {
        $sql = $this->sql_delete($tbname, $where);
        return $this->query_unbuffered($sql);
    }

    /**
     * ------------------------------
     * 批量删除
     * ------------------------------
     * @param  string $tbname 表名
     * @param  array $row 条件数组
     * @param  string $key 以什么为标准删除
     * @return bool
     * @example $row = array(1,2,3,4,6,8) $key = 'id';删除id为1,2,3,4,6,8的数据
     */
    function delete_row($tbname,$row,$key = 'id')
    {
        $str = '';
        foreach ($row as $v)
        {
            $str .= "'".$v."',";
        }
        $str = substr($str,0,-1);
        return $this->row_delete($tbname,"$key in($str)");
    }

    /**
     * ------------------------------
     * 查询数据
     * ------------------------------
     * @param  string $tbname 表名
     * @param  string $where 定位条件
     * @param  string $fields 要查询的字段
     * @param  int $limit 取几条
     * @param  string $orderby 以什么排序
     * @param  string $sort 排序方式
     * @return array
     */
    function row_select($tbname, $where='', $fields='*', $limit=0, $orderBy='', $sort='DESC')
    {
        $sql = $this->sql_select($tbname, $where, $fields, $limit, $orderBy, $sort);
        return $this->row_query($sql);
    }

    /**
     * ------------------------------
     * 查询一条数据
     * ------------------------------
     * @param  string $tbname 表名
     * @param  string $where 定位条件
     * @param  string $fields 要查询的字段
     * @param  string $orderby 以什么排序
     * @param  string $sort 排序方式
     * @return array
     */
    function row_select_one($tbname, $where='', $fields='*', $orderBy='', $sort='DESC')
    {
        $sql = $this->sql_select($tbname, $where, $fields, 1, $orderBy, $sort);
        return $this->row_query_one($sql);
    }

    /**
     * ------------------------------
     * 执行sql语句
     * ------------------------------
     * @param  string $sql sql语句
     * @return resource
     */
    function row_query($sql)
    {
        $rs = $this->query($sql);
        $rs_num = $this->num_rows($rs);
        $rows = array();
        for($i=0; $i<$rs_num; $i++)
        {
            $rows[] = $this->fetch_array($rs);
        }
        $this->free_result($rs);
        return $rows;
    }

    /**
     * ------------------------------
     * 执行sql并只取结果的一行
     * ------------------------------
     * @param  string $sql sql语句
     * @return array
     */
    function row_query_one($sql)
    {
        $rs = $this->query($sql);
        $row = $this->fetch_array($rs);
        $this->free_result($rs);
        return $row;
    }

    /**
     * ------------------------------
     * 查询满足条件的个数
     * ------------------------------
     * @param  string $tbname 表名
     * @param  string $where 定位条件
     * @return int
     */
    function row_count($tbname,$where='')
    {
        $sql = 'SELECT count(*) as row_num FROM `'.$tbname.'` '.($where ? ' WHERE '.$where : '');
        $row = $this->row_query_one($sql);
        return $row['row_num'];
    }
}
?>