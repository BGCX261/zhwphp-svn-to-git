<?php
/**
 * ------------------------------
 * 操作数据类
 * ------------------------------
 * @name    CURD.class.php
 * @version 2010.04.16
 * @author  张宏伟
 */

class Model
{
    //db类对象
    var $db = null;
    //要操作的表名
    var $tbName;
    //要写入数据表中的数据
    var $data = array();
    //表的详细信息
    var $tbInfo = array();
    //表中的字段
    var $tbFiled = array();
    //只需要数字的字段类型
    var $row_intval = array('int','date','tinyint','smallint','mediumint','bigint','datetime','timestamp','time','year');
    //自定义过滤数据模型
    var $_validate = array();
    //字段字段映射定义
    var $_map = array();
    //转义html标签
    var $htmlspecialchars = true;
    //是否用填充表中不可为空的字段
    var $fillEmptyField = true;
    //用什么填充表中的空字段
    var $padding = '';

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
        if(!$this->tbInfo = Cache::R($tbName.'_tbinfo',0))
        {
            $this->tbInfo = $this->db->get_table_info($tbName);
            @Cache::W($tbName.'_tbinfo',$this->tbInfo);
        }
        foreach ($this->tbInfo as $v)
        {
            $this->tbFiled[] = $v['Field'];
        }
    }

    /**
     * ------------------------------
     * 插入数据函数
     * ------------------------------
     * @param  array $data 自定义数据
     * @return bool
     */
    function insert($data = array())
    {
        $data = $this->final_data($data);
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
        $data = $this->final_data($data);
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
        $data = $this->final_data($data);
        $val = $data[$key];
        if ($this->array_count($data) == 2) return $this->db->delete_row($this->tbName,$val,$key);
        return $this->db->row_delete($this->tbName,"$key=$val");
    }

    /**
     * ------------------------------
     * 获取数据，完成字段映射
     * ------------------------------
     * @return array
     */
    private function get_data()
    {
        //默认取$_POST的数据
        if(count($this->data) < 1) $this->data = $_POST;
        //无字段映射直接返回数据
        if (count($this->_map) < 1) return $this->data;
        //有字段映射按映射处理
        foreach ($this->_map as $k => $v)
        {
            $this->data[$v] = $this->data[$k];
            if(isset($this->data[$k])) unset($this->data[$k]);
        }
        return $this->data;
    }

    /**
     * ------------------------------
     * 根据表字段和字段属性处理数据
     * ------------------------------
     * @return array
     */
    function auto_as_table()
    {
        //删除数据表中没有的字段
        $row = array_intersect_key($this->get_data(),array_flip($this->tbFiled));
        //计算有几组数据
        $count = 0;
        foreach ($row as $v)
        {
            $count = count($v);
            break;
        }
        //跟据数据表字段属性处理数据
        foreach ($this->tbInfo as $tbVal)
        {
            //是否填充表中的非空字段
            if ($this->fillEmptyField === true)
            {
                //填充数据表中为空的字段
                if (strtolower($tbVal['Null']) == 'no')
                {
                    if ($this->array_count($row) == 2 )
                    {
                        for ($i = 0; $i < $count; $i++)
                        {
                            if (!isset($row[$tbVal['Field']][$i]) || $row[$tbVal['Field']][$i] == '') $row[$tbVal['Field']][$i] = $this->padding;
                        }
                    }
                    elseif (!isset($row[$tbVal['Field']]) || $row[$tbVal['Field']] == '')
                    {
                        $row[$tbVal['Field']] = $this->padding;
                    }
                }
            }
            //处理只需要数字的字段
            foreach ($row as $k => $v)
            {
                if($tbVal['Field'] == $k)
                {
                    //判断是否需要进行转数字处理
                    $fieldType = $this->get_type_from_string($tbVal['Type']);
                    if (in_array($fieldType,$this->row_intval))
                    {
                        //判断是否为二维数组数据，并分别处理
                        if(is_array($v))
                        {
                            for ($i = 0; $i < $count; $i++)
                            {
                                $row[$k][$i] = $this->str_to_number($v[$i]);
                            }
                        }
                        else
                        {
                            $row[$k] = $this->str_to_number($v);
                        }
                    }
                }
            }
        }
        return $row;
    }

    /**
     * ------------------------------
     * 自定义处理数据(自定义后默认不使用htmlspecialchars())
     * ------------------------------
     * @return array
     */
    function validate()
    {
        $row = $this->auto_as_table();
        //计算有几组数据
        $count = 0;
        foreach ($row as $v)
        {
            $count = count($v);
            break;
        }
        //是否使用htmlspecialchars()
        $escape = $this->htmlspecialchars ? 'htmlescape' : 'escape';
        //无自定义直接返回转义后的数据
        if (count($this->_validate) < 1) return $escape($row,'yes');
        $row_escape = $escape($row,'yes');
        //使用自定义方式处理数据
        foreach ($this->_validate as $v)
        {
            if ($v[1] == '') $row_escape[$v[0]] = $row[$v[0]];
            elseif (is_string($v[1]))
            {
                if(is_array($row[$v[0]]))
                {
                    for ($i = 0; $i < $count; $i++)
                    {
                        $row_escape[$v[0]][$i] = $v[1]($row[$v[0]][$i]);
                    }
                }
                else
                {
                    $row_escape[$v[0]] = $v[1]($row[$v[0]]);
                }
            }
            elseif (is_array($v[1]))
            {
                $row_key = $row[$v[0]];
                foreach ($v[1] as $fun)
                {
                    if(is_array($row_key))
                    {
                        for ($i = 0; $i < $count; $i++)
                        {
                            $row_key[$i] = $fun($row_key[$i]);
                        }
                    }
                    else
                    {
                        $row_key = $fun($row_key);
                    }
                }
                $row_escape[$v[0]] = $row_key;
            }
            $row_escape[$v[0]] = escape($row_escape[$v[0]]);
        }
        return $row_escape;
    }

    /**
     * ------------------------------
     * 取出字符串中的数字
     * ------------------------------
     * @param  string $str 字符串
     * @return int
     */
    function str_to_number($str)
    {
        $str = preg_replace("/[^0-9]*/",'',$str);
        return intval($str);
    }

    /**
     * ------------------------------
     * 取出表字段的类型的字符串
     * ------------------------------
     * @param  string $str 字段类型Type
     * @return string
     */
    function get_type_from_string($str)
    {
        preg_match("/[a-z]*/i",$str,$matches);
        return strtolower($matches[0]);
    }

    /**
     * -----------------------------
     * 把数据丢给$this->data,处理后再清空
     * -----------------------------
     * @param  array $data 数据
     * @return array
     */
    function final_data($data = array())
    {
        $this->data = $data;
        $data = $this->validate();
        $this->data = array();
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
     * @return unknow_type
     */
    function msg($bool,$success = '数据操作成功！',$error = '数据操作失败！',$successUrl = URL,$errorUrl = '-1')
    {
        if ($success == '') $success = '数据操作成功！';
        if ($error == '') $error = '数据操作失败！';
        if ($successUrl == '') $successUrl = URL;
        if ($errorUrl == '') $errorUrl = '-1';
        if ($bool)
        {
            show('数据操作成功',$success,$successUrl);
        }
        else
        {
            show('数据操作失败',$error,$errorUrl);
        }
    }

    /**
     * -----------------------------
     * 计算数组的维数
     * -----------------------------
     * @param  array $arr 要计算的数组
     * @return int
     */
    function array_count($arr,$count = 0)
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
     * 析构函数
     * ------------------------------
     */
    function __destruct()
    {
        $this->_validate = array();
        $this->_map = array();
    }
}
?>