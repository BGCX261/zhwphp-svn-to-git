<?php
/**
 * ------------------------------
 * 分类操作类
 * ------------------------------
 * @name    Page.class.php
 * @version 2010.04.17
 * @author  张宏伟
 */

class Page
{
    //总记录条数
    var $totalNum;
    //每页显示的条目数
    var $pageSize = 10;
    //总的页数
    var $totalPage;
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
    function Page($tbname,$where='1=1',$field='*',$pageSize=10,$orderBy='')
    {
        !extension_loaded('mysql') && exit('mysql do not exist!');
        !mysql_ping() && exit('mysql can not connect!');
        if ($where == '') $where = '1=1';
        if ($field == '') $field = '*';
        $this->pageSize = $pageSize;
        //获取总记录条数
        $sql = "SELECT count(*) as row_num FROM `$tbname` WHERE $where";
        $row_num = mysql_fetch_array(mysql_query($sql));
        $this->totalNum = $row_num['row_num'];
        $this->totalPage = ceil($this->totalNum / $this->pageSize);
        
        //获得当前page
        $page = (isset($_GET['page']) && $_GET['page'] != '') ? ceil($_GET['page']) : 1;
        $this->page = ($page < $this->totalPage) ? $page : $this->totalPage;
        $this->page = ($this->page < 1) ? 1 : $this->page;
        //计算查询的起始值
        $start = ($this->page - 1) * $this->pageSize;
        //查询结果
        //$sql = "SELECT $field FROM $tbname WHERE $where AND id > $start ORDER BY id ASC".($orderBy ? ",$orderBy" : '')." LIMIT $this->pageSize";
        $sql = "SELECT $field FROM `$tbname` WHERE $where".($orderBy ? ' ORDER BY '.$orderBy : '')." LIMIT $start,$this->pageSize";
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
     * 构造url
     * ------------------------------
     * @param  int $page  页数
     * @return string
     */
    function get_url($page)
    {
        $url = parse_url($_SERVER['REQUEST_URI']);
        $path = $url['path'];
        $url_str = 'index.php?';
        $_GET['page'] = $page;
        foreach ($_GET as $k=>$v)
        {
            $url_str .= $k.'='.$v.'&';
        }
        return substr($url_str,0,-1);
    }
    
    /**
     * ------------------------------
     * 获得分页的基本信息
     * ------------------------------
     * @return array
     */
    function get_basic_info()
    {
        return array
        (
            'first'     => $this->get_url(1),
            'prev'      => $this->get_url($this->page-1),
            'next'      => $this->get_url($this->page+1),
            'last'      => $this->get_url($this->totalPage),
            'totalNum'  => $this->totalNum,
            'totalPage' => $this->totalPage,
            'page'      => $this->page
        );
    }
    
    /**
     * ------------------------------
     * <select>方式页面跳转框
     * ------------------------------
     * @return string
     */
    function button_select()
    {
        $str = "<select onchange=location.href='".$this->get_url('')."'+this.value>";
        for ($i=1;$i<=$this->totalPage;$i++)
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
    function button_basic($totNum=1,$correntNum=1,$firstAndLast=1)
    {
        extract($this->get_basic_info());
        $str = '';
        $str .= ($totNum ? '共'.$totalNum.'条&nbsp;&nbsp;&nbsp;&nbsp;' : '');
        $str .= ($correntNum ? $page.'/'.$totalPage.'页&nbsp;&nbsp;&nbsp;&nbsp;' : '');
        $str .= ($firstAndLast ? "<a href=$first>首页</a>&nbsp;&nbsp;&nbsp;&nbsp;" : '');
        $str .= "<a href=$prev>上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
        $str .= "<a href=$next>下一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
        $str .= ($firstAndLast ? "<a href=$last>尾页</a>&nbsp;&nbsp;&nbsp;&nbsp;" : '');
        return $str;
    }
}
?>