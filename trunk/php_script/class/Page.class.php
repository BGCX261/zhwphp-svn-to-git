<?php
/**
 * ------------------------------
 * 分页类
 * ------------------------------
 * @name   Page.class.php
 * @author 张宏伟 mail@zhwphp.com
 * charset gbk
 */

class Page
{
    //总记录条数
    var $total_num;
    //每页显示的条目数
    var $page_size = 10;
    //总的页数
    var $total_page;
    //当前页数
    var $page = 1;
    //查询结果数据
    var $data;
    /**
     * ------------------------------
     * 构造函数
     * ------------------------------
     * @param  string $tbname   要操作的表名
     * @param  string $where    定位条件
     * @param  string $field    要查询的字段
     * @param  string $pageSize 每页显示数量
     * @param  string $orderBy  排序方式
     */
    function Page($tbname,$where='1=1',$field='*',$page_size=20,$order_by='',$group_by='')
    {
        !mysql_ping() && exit('mysql can not connect!');

        //获取总记录条数
        if($group_by)
           $sql = "SELECT count(DISTINCT $group_by) as row_num FROM $tbname WHERE $where";
        else 
           $sql = "SELECT count(*) as row_num FROM $tbname WHERE $where";
        $row_num = mysql_fetch_array(mysql_query($sql));
        $this->total_num = $row_num['row_num'];
        $this->total_page = ceil($this->total_num / $page_size);

        //当前page
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $this->page = ($page < $this->total_page && $this->page != 0) ? $page : $this->total_page;
        //计算查询的起始值
        $start = ($this->page - 1) * $page_size;
        //查询结果
        if($group_by) $sql = "SELECT $field FROM $tbname WHERE $where GROUP BY $group_by".($order_by ? ' ORDER BY '.$order_by : '')." LIMIT $start,$this->page_size";
        else $sql = "SELECT $field FROM $tbname WHERE $where".($order_by ? ' ORDER BY '.$order_by : '')." LIMIT $start,$this->page_size";
        $result = mysql_query($sql);
        $data = array();
        while($row = mysql_fetch_assoc($result))
        {
            $data[] = $row;
        }
        $this->data = $data;
    }

    /**
     * ------------------------------
     * 获得查询数据
     * ------------------------------
     * @return array
     */
    function get_data()
    {
        return $this->data;
    }

    /**
     * ------------------------------
     * 获得除了页码部分的URL
     * ------------------------------
     * @return string
     */
    function get_url()
    {
        $arr_url = parse_url($_SERVER['REQUEST_URI']);
        if (!isset($arr_url['query'])) $arr_url['query'] = '';
        parse_str($arr_url['query'],$arr_get);
        if (isset($arr_get['page'])) unset($arr_get['page']);
        $str_url = '';
        foreach ($arr_get as $k => $v)
        {
            $str_url .= $k.'='.$v.'&';
        }
        return $arr_url['path'].'?'.substr($str_url,0,-1).'&page=';
    }

    /**
     * ------------------------------
     * <select>方式页面跳转框
     * ------------------------------
     * @return string
     */
    function button_select()
    {
        $str = "<select onchange=\"location.href='".$this->get_url()."'+this.value\">";
        for ($i = 1; $i <= $this->total_page; $i++)
        {
            $selected = ($this->page == $i) ? 'selected' : '';
            $str .= "<option value=$i $selected>$i</option>";
        }
        return $str .= '</select>';
    }

    /**
     * ------------------------------
     * 普通页码条
     * ------------------------------
     * @param  int $totalNum 是否显示总页数，0为不显示（默认显示）
     * @param  int $correntNum 是否显示当前页数，0为不显示（默认显示）
     * @return string
     */
    function button_basic($total_num=1,$current_page=1,$first_and_last=1)
    {
        $url = $this->get_url();
        $str = '';
        $str .= ($total_num ? '共'.$this->total_num.'条&nbsp;&nbsp;&nbsp;&nbsp;' : '');
        $str .= ($current_page ? $this->page.'/'.$this->total_page.'页&nbsp;&nbsp;&nbsp;&nbsp;' : '');
        $str .= ($first_and_last ? ($this->total_page > 1 ? "<a href='{$url}1'>首页</a>" : '<a>首页</a>')."&nbsp;&nbsp;&nbsp;&nbsp;" : '');
        $str .= ($this->page > 1 ? "<a href='$url".($this->page-1)."'>上一页</a>" : '<a>上一页</a>')."&nbsp;&nbsp;&nbsp;&nbsp;";
        $str .= ($page+1 <= $this->total_page ? "<a href='$url".($this->page+1)."'>下一页</a>" : '<a>下一页</a>')."&nbsp;&nbsp;&nbsp;&nbsp;";
        $str .= ($first_and_last ? ($total_num > 1 ? "<a href='{$url}{$this->total_page}'>尾页</a>" : '<a>尾页</a>')."&nbsp;&nbsp;&nbsp;&nbsp;" : '');
        return $str;
    }
    
    /**
     * ------------------------------
     * do what
     * ------------------------------
     * @param  unknow
     * @return unknow
     */
    function button_number1($num=10)
    {
        $url = $this->get_url();
        $str = $this->page > 1 ? "<a href='{$url}".($this->page-1)."'>&lt;</a>" : "<span>&lt;</span>";
        
    }

    /**
     * ------------------------------
     *  数字按钮2
     * ------------------------------
     * @return string
     */
    function button_number2()
    {
        $url = $this->get_url();
        $str = $this->page > 1 ? "<a href='{$url}".($this->page-1)."'>&lt;</a>" : "<span>&lt;</span>";

        if ($this->total_page <= 10)
        {
            for ($i = 1; $i <= $this->total_page; $i++)
            {
                if ($i == $this->page) $str .= "<span class='page_current'>$i</span>";
                else $str.= "<a href='{$url}{$i}'>$i</a>";
            }
        }
        else
        {
            if ($page < 7)
            {
                for ($i=1;$i<8;$i++)
                {
                    $url = $this->get_url($i);
                    if ($i == $page)
                    {
                        $str .= "<span class=current>$i</span>";
                        continue;
                    }
                    $str.= "<a href=$url>$i</a>";
                }
                $str .= '...';
            }
            elseif ($page >= 7)
            {
                for ($i=1;$i<3;$i++)
                {
                    $url = $this->get_url($i);
                    $str .= "<a href=$url>$i</a>";
                }
                $str .= '...';
                for ($i=$page-2;$i<=$page+2;$i++)
                {
                    if ($i == $totalPage - 1) break;
                    $url = $this->get_url($i);
                    if ($i == $page)
                    {
                        $str .= "<span class=current>$i</span>";
                        continue;
                    }
                    $str.= "<a href=$url>$i</a>";
                }
                if ($page < $totalPage - 4) $str .= '...';
            }
            $str .= '<a href='.$this->get_url($totalPage-1).'>'.($totalPage-1).'</a>';
            $str .= '<a href='.$this->get_url($totalPage).'>'.$totalPage.'</a>';
        }
        $str .= $page < $totalPage ? "<a href=$next>&gt;</a></div>" : "<span class=disabled>&gt;</span></div>";
        return $str;
    }
}
?>