<?php
/**
 * ------------------------------
 * ��ҳ��
 * ------------------------------
 * @name   Page.class.php
 * @author �ź�ΰ mail@zhwphp.com
 * charset gbk
 */

class Page
{
    //�ܼ�¼����
    var $total_num;
    //ÿҳ��ʾ����Ŀ��
    var $page_size = 10;
    //�ܵ�ҳ��
    var $total_page;
    //��ǰҳ��
    var $page = 1;
    //��ѯ�������
    var $data;
    /**
     * ------------------------------
     * ���캯��
     * ------------------------------
     * @param  string $tbname   Ҫ�����ı���
     * @param  string $where    ��λ����
     * @param  string $field    Ҫ��ѯ���ֶ�
     * @param  string $pageSize ÿҳ��ʾ����
     * @param  string $orderBy  ����ʽ
     */
    function Page($tbname,$where='1=1',$field='*',$page_size=20,$order_by='',$group_by='')
    {
        !mysql_ping() && exit('mysql can not connect!');

        //��ȡ�ܼ�¼����
        if($group_by)
           $sql = "SELECT count(DISTINCT $group_by) as row_num FROM $tbname WHERE $where";
        else 
           $sql = "SELECT count(*) as row_num FROM $tbname WHERE $where";
        $row_num = mysql_fetch_array(mysql_query($sql));
        $this->total_num = $row_num['row_num'];
        $this->total_page = ceil($this->total_num / $page_size);

        //��ǰpage
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $this->page = ($page < $this->total_page && $this->page != 0) ? $page : $this->total_page;
        //�����ѯ����ʼֵ
        $start = ($this->page - 1) * $page_size;
        //��ѯ���
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
     * ��ò�ѯ����
     * ------------------------------
     * @return array
     */
    function get_data()
    {
        return $this->data;
    }

    /**
     * ------------------------------
     * ��ó���ҳ�벿�ֵ�URL
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
     * <select>��ʽҳ����ת��
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
     * ��ͨҳ����
     * ------------------------------
     * @param  int $totalNum �Ƿ���ʾ��ҳ����0Ϊ����ʾ��Ĭ����ʾ��
     * @param  int $correntNum �Ƿ���ʾ��ǰҳ����0Ϊ����ʾ��Ĭ����ʾ��
     * @return string
     */
    function button_basic($total_num=1,$current_page=1,$first_and_last=1)
    {
        $url = $this->get_url();
        $str = '';
        $str .= ($total_num ? '��'.$this->total_num.'��&nbsp;&nbsp;&nbsp;&nbsp;' : '');
        $str .= ($current_page ? $this->page.'/'.$this->total_page.'ҳ&nbsp;&nbsp;&nbsp;&nbsp;' : '');
        $str .= ($first_and_last ? ($this->total_page > 1 ? "<a href='{$url}1'>��ҳ</a>" : '<a>��ҳ</a>')."&nbsp;&nbsp;&nbsp;&nbsp;" : '');
        $str .= ($this->page > 1 ? "<a href='$url".($this->page-1)."'>��һҳ</a>" : '<a>��һҳ</a>')."&nbsp;&nbsp;&nbsp;&nbsp;";
        $str .= ($page+1 <= $this->total_page ? "<a href='$url".($this->page+1)."'>��һҳ</a>" : '<a>��һҳ</a>')."&nbsp;&nbsp;&nbsp;&nbsp;";
        $str .= ($first_and_last ? ($total_num > 1 ? "<a href='{$url}{$this->total_page}'>βҳ</a>" : '<a>βҳ</a>')."&nbsp;&nbsp;&nbsp;&nbsp;" : '');
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
     *  ���ְ�ť2
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