<?php
/**
 * ------------------------------
 * 数据自动处理类
 * ------------------------------
 * @name    Model.class.php
 * @version 2010.05.26
 * @author  张宏伟
 */

if (!defined('MAP_INCLUDE_DIR')) define('MAP_INCLUDE_DIR','../config/');
if (!defined('MAP_INCLUDE_FILE')) define('MAP_INCLUDE_FILE','_map.inc.php');

class Model
{
    private $db = '';                               //db类对象
    private $tbName;                                //要操作的表名
    private $tbInfo = array();                      //表的详细信息
    //只需要数字的字段类型
    private $row_intval = array('int','date','tinyint','smallint','mediumint','bigint','datetime','timestamp','time','year');
    public  $_validate = array();                   //自定义过滤数据模型
    public  $_map = array();                        //字段字段映射定义
    public  $htmlspecialchars = true;               //是否开启转义html标签
    public  $fillEmptyField = true;                 //是否用填充表中不可为空的字段
    public  $padding = ' ';                         //用什么填充表中的空字段
    public  $cache = false;                         //是否开启表信息缓存

    /**
     * ------------------------------
     * 构造函数
     * ------------------------------
     * @param  string $tbName 要操作的表名
     */
    function __construct($tbName)
    {

        global $db;
        $this->db = $db;
        $this->tbName = $tbName;
        $this->get_table_info();
    }

    /**
     * ------------------------------
     * 插入数据函数
     * ------------------------------
     * @param  array[optional] $data 自定义数据
     * @return bool
     */
    function insert($data = array())
    {
        $data = $this->get_data($data);
        if ($this->array_count($data) == 2) return $this->db->insert_row($this->tbName,$data);
        return $this->db->row_insert($this->tbName,$data);
    }

    /**
     * ------------------------------
     * 更新数据函数
     * ------------------------------
     * @param  string $key 以什么为标准修改
     * @param  array $data 自定义数据
     * @return bool
     */
    function update($key = 'id',$data = array())
    {
        $data = $this->get_data($data);
        $val = $data[$key];
        unset($data[$key]);
        return $this->db->row_update($this->tbName,$data,"$key=$val");
    }

    /**
     * ------------------------------
     * 查询数据函数
     * ------------------------------
     * @param  unkonw_type
     * @return unknow_type
     */
    function select($what='*')
    {

    }

    /**
     * ------------------------------
     * 删除数据函数
     * ------------------------------
     * @param  string $key 以什么为标准删除
     * @param  array 自定义数据
     * @return bool
     */
    function delete($key = 'id',$data = array())
    {
        $data = $this->get_data($data);
        $val = $data[$key];
        if ($this->array_count($data) == 2) return $this->db->delete_row($this->tbName,$val,$key);
        return $this->db->row_delete($this->tbName,"$key=$val");
    }

    /**
     * ------------------------------
     * 获得表字段信息
     * ------------------------------
     */
    private function get_table_info()
    {
        if ($this->cache)                                   //是否开启了表字段信息缓存
        {
            if (!class_exists('cache')) include('Cache.class.php');     //包含缓存类
            $this->tbInfo = Cache::R($this->tbName.'_tbinfo',0);
            if (!$this->tbInfo)
            {
                $this->tbInfo = $this->db->get_table_info($this->tbName);
                Cache::W($this->tbName.'_tbinfo',$this->tbInfo);
            }
        }
        else $this->tbInfo = $this->db->get_table_info($this->tbName);
    }

    /**
     * ------------------------------
     * 获取数据，完成字段映射
     * ------------------------------
     * @param  array[optional] $arr_val
     * @return array
     */
    private function get_value($arr_val = array())
    {
        if ($arr_val == array()) $arr_val = $_POST;         //无参数取post的值
        if (!file_exists(MAP_INCLUDE_DIR.MAP_INCLUDE_FILE)) //如果字段映射文件不存在
        {
            @mkdir(MAP_INCLUDE_DIR);                        //创建目标目录
            //生成默认字段映射包含文件
            file_put_contents(MAP_INCLUDE_DIR.MAP_INCLUDE_FILE,"<?php\r\n\$_map = array\r\n(\r\n\t//'表单中的name' => '对应数据库字段',\r\n)\r\n?>");
        }
        include(MAP_INCLUDE_DIR.MAP_INCLUDE_FILE);          //包含字段映射文件
        $_map = array_merge($_map,$this->_map);             //调用时临时设定的映射优先
        foreach ($arr_val as $k => $v)                      //完成字段映射
        {
            if (isset($_map[$k])) $data[$_map[$k]] = $v;
            else $data[$k] = $v;
        }
        unset($arr_val);                                    //删除无用数据
        unset($_map);
        return $data;
    }

    /**
     * ------------------------------
     * 根据表字段清理数据多余字段
     * ------------------------------
     * @param  array $arr
     * @return array
     */
    private function clean_excess_field($arr)
    {
        $tbField = array();
        foreach ($this->tbInfo as $v)
        {
            $tbField[$v['Field']] = '';
        }
        $row = array_intersect_key($arr,$tbField);
        return $row;
    }

    /**
     * ------------------------------
     * 使用自定义函数处理数据
     * ------------------------------
     * @param  array $arr
     * @return array
     */
    private function validate($arr)
    {
        $arr_count = $this->array_count($arr);
        foreach ($this->_validate as $k => $v)
        {
            if (is_array($v))
            {
                foreach ($v as $func)
                {
                    $arr = $this->func_value($arr,$k,$func);
                }
            }
            else $arr = $this->func_value($arr,$k,$v);
        }
        if ($this->htmlspecialchars === true) $arr = $this->safe_html($arr);
        return $arr;
    }

    /**
     * ------------------------------
     * 根据表字段属性处理数据
     * ------------------------------
     * @param  array $arr
     * @return array
     */
    private function format_data($arr)
    {
        //计算有几组数据
        $count = 0;
        foreach ($arr as $v)
        {
            $count = count($v);
            break;
        }
        $arr_count = $this->array_count($arr);                  //计算数据为几维数组
        foreach ($this->tbInfo as $tbInfo)                      //跟据数据表字段属性处理数据
        {
            if ($this->fillEmptyField === true)                 //如启开启了非空字段的填充
            {
                if (strtolower($tbInfo['Null']) == 'no')        //如果是非空字段
                {
                    if ($tbInfo['Default'] === '')              //如果没有设置默认值
                    {
                        if ($arr_count == 2 )                   //如果是数组数据
                        {
                            for ($i = 0; $i < $count; $i++)
                            {
                                if (!isset($arr[$tbInfo['Field']][$i]) || $arr[$tbInfo['Field']][$i] === '') $arr[$tbInfo['Field']][$i] = $this->padding;
                            }
                        }
                        elseif (!isset($arr[$tbInfo['Field']]) || $arr[$tbInfo['Field']] === '') $arr[$tbInfo['Field']] = $this->padding;
                    }
                }
            }

            $fieldType = $this->get_field_type($tbInfo['Type']);    //获得当前字段的类型
            if (in_array($fieldType,$this->row_intval))             //如果属于要转为数字的字段
            {
                if ($arr_count == 2)                                //如果数据是数组
                {
                    for ($i = 0; $i < $count; $i++)
                    {
                        if (isset($arr[$tbInfo['Field']][$i])) $arr[$tbInfo['Field']][$i] = $this->str_to_number($arr[$tbInfo['Field']][$i]);
                    }
                }
                elseif (isset($arr[$tbInfo['Field']])) $arr[$tbInfo['Field']] = $this->str_to_number($arr[$tbInfo['Field']]);
            }
        }
        return $arr;
    }

    /**
     * ------------------------------
     * 获取处理后的数据
     * ------------------------------
     * @param  array[optional] $arr_val
     * @return array
     */
    function get_data($arr_val = array())
    {
        $data = $this->get_value($arr_val);             //获得数据
        $data = $this->clean_excess_field($data);       //清除表中没有的字段
        $data = $this->validate($data);                 //自定义处理数据
        $data = $this->format_data($data);              //根据表字段属性处理数据
        $data = $this->_addslashes($data);              //对数据addslashes
        return $data;
    }

    /**
     * ------------------------------
     * 提示操作后信息
     * ------------------------------
     * @param  bool $bool 布而值
     * @param  string $success 为true时的提示
     * @param  sgring $error 为false时的提示
     * @param  string $successUrl 为true时跳转到的页面（默认返回当前URL）
     * @param  string $errorUrl 为false时跳转到的页面（默认返回上一页面）
     */
    function msg($bool,$success = '',$error = '',$successUrl = '',$errorUrl = '-1')
    {
        if ($success == '') $success = '数据操作成功！';
        if ($error == '') $error = '数据操作失败！';
        if ($successUrl == '') $successUrl = URL;
        if ($bool) $this->show($success,$successUrl);
        else $this->show($error,$errorUrl);
    }

    /**
     * ------------------------------
     * 取出字符串中的数字
     * ------------------------------
     * @param  string $str 字符串
     * @return int
     */
    private function str_to_number($str)
    {
        return preg_replace("/[^0-9]*/",'',$str);
    }

    /**
     * ------------------------------
     * 获取表字段类型
     * ------------------------------
     * @param  string $str 字段类型Type
     * @return string
     */
    private function get_field_type($str)
    {
        if(($offset = strpos($str,'(')) !== false)
        $type = substr($str,0,$offset);
        else $type = $str;
        return $type;
    }

    /**
     * ------------------------------
     * 对数据使用函数
     * ------------------------------
     * @param  array $data
     * @param  string $key
     * @param  string $func
     * @return array
     */
    private function func_value($data,$key,$func)
    {
        if (is_array($data[$key])) $data[$key] = array_map($func,$data[$key]);
        else $data[$key] = $func($data[$key]);
        return $data;
    }

    /**
     * -----------------------------
     * 计算数组的维数
     * -----------------------------
     * @param  array $arr 要计算的数组
     * @return int
     */
    private function array_count($arr,$count = 0)
    {
        if (is_array($arr))
        {
            $count++;
            foreach ($arr as $v)
            {
                return $this->array_count($v,$count);
                break;
            }
        }
        return $count;
    }

    /**
     * ------------------------------
     * 转为安全的html代码
     * ------------------------------
     * @param  string/array $val
     * @return string/array
     */
    private function safe_html($val)
    {
        if (is_array($val))
        {
            foreach ($val as $k => $v)
            {
                $val[$k] = $this->safe_html($v);
            }
            return $val;
        }
        return htmlspecialchars(trim($val));
    }

    /**
     * ------------------------------
     * 给数据addslashes
     * ------------------------------
     * @param  string/array $val
     * @return string/array
     */
    private function _addslashes($val)
    {
        $magic_quotes_gpc = get_magic_quotes_gpc();
        if (is_array($val))
        {
            foreach ($val as $k => $v)
            {
                $val[$k] = $this->_addslashes($v);
            }
            return $val;
        }
        if ($magic_quotes_gpc == 1) return $val;
        $val = addslashes($val);
        return $val;
    }

    /**
     * ------------------------------
     * 使用JS弹出消息框
     * ------------------------------
     * @param  string $msg  消息内容
     * @param  string $goto 要跳转到的url，为0时不跳转，-1时返回上级页面
     * @param  string $show 是否输出（默认是）
     */
    private function show($msg,$goto = 0,$show = 1)
    {
        $str = "
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <script language='javascript'>alert('$msg');";
        if($goto == 0) $str .= '';
        elseif($goto == -1) $str .= 'history.go(-1);';
        else $str .= "location.href='{$goto}';";
        $str .= '</script>';
        if($show == 1)
        {
            echo $str;
            if($goto != 0) exit;
        }
        return $str;
    }
}
?>