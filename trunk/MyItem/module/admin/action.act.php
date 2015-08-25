<?php
class action
{
    function action()
    {
        global $db;

        //判断是否登陆
        !isset($_SESSION['user']) && exit('Please login!');

        //判断tid的合法性
        if (isset($_GET['tid']) && $_GET['tid'] > 0 && $_GET['tid'] <= 3)   $tid = ceil($_GET['tid']);
        if (isset($_POST['tid']) && $_POST['tid'] > 0 && $_POST['tid'] <= 3) $tid = ceil($_POST['tid']);
        !isset($tid) && exit('tid不合法！');
        
        //获取表的信息
        (!isset($_GET['tb']) || $_GET['tb'] == '' || $_GET['tb'] == 0) && exit('tb error!');
        $tables = Cache::R('tables',5000);
        if (!$tables)
        {
            $tables = $db->row_select('tables');
            @Cache::W('tables',$tables);
        }
        
        //获取表名
        $tb = intval($_GET['tb']);
        !($tbname = get_table_name($tb,$tables)) && exit('tb error!');
        
        //转到添加记录页面
        if (isset($_GET['do']) && $_GET['do'] == 'add')
        {
            $arr = array('id'=>'','tid'=>$tid,'sub'=>'添加','do'=>'add','tb'=>$tb);
            tpl($tbname.'_edit','arr',$arr);
        }

        //转到修改记录页面
        if (isset($_GET['do']) && $_GET['do'] == 'edit')
        {
            (!isset($_GET['id']) || $_GET['id'] == '') && show('','操作错误！缺少id','-1');
            $id = ceil($_GET['id']);
            $arr = $db->row_select_one($tbname,"id=$id");
            $arr['sub'] = '修改';
            $arr['do'] = 'edit';
            $arr['tb'] = $tb;
            tpl($tbname.'_edit','arr',$arr);
        }

        //添加一条记录
        if (isset($_POST['add']))
        {
            $Model = new Model($tbname);
            if (isset($_POST['content']))
            {
                $Model->_validate = array(array('content',''));
            }
            $rs = $Model->insert();
            $Model->msg($rs,'数据添加成功！','数据添加失败！',URL);
        }

        //更新一条记录
        if (isset($_POST['edit']))
        {
            $Model = new Model($tbname);
            if (isset($_POST['list_id']))
            {
                $id = ceil($_POST['id']);
                $list_id = ceil($_POST['list_id']);
                $post = htmlescape($_POST);
                $arr = array('id'=>$list_id,'name'=>$post['name'],'introduction'=>$post['introduction'],'say'=>$post['say'],'img'=>$post['img']);
                $rs = $db->row_update('teacher',$arr,"id=$id");
                $Model->msg($rs,'数据修改成功！','数据修改失败！',URL);
            }
            if (isset($_POST['content']))
            {
                $Model->_validate = array(array('content',''));
            }
            $rs = $Model->update();
            if ($tbname == 'studio')
            {
                $Model->msg($rs,'数据修改成功！','数据修改失败','?module=admin&act=action&tb=10&tid=1&do=edit&id=1');
            }
            $Model->msg($rs,'数据修改成功！','数据修改失败！',URL);
        }
        
        //修改开班信息标题
        if (isset($_POST['update']))
        {
            $title = htmlescape($_POST['title']);
            $rs = $db->row_update('classes',array('title'=>$title),"id=-1");
            if ($rs)
            {
                show('','修改开班信息标题成功！',URL);
            }
            else 
            {
                show('','修改失败，请稍后再试！','-1');
            }
        }

        //删除一条记录
        if (isset($_GET['do']) && $_GET['do'] == 'del')
        {
            (!isset($_GET['id']) || $_GET['id'] == '') && show('','操作错误！缺少id','-1');
            $id = ceil($_GET['id']);
            $rs = $db->row_delete($tbname,"id=$id");
            if ($rs)
            {
                show('提示','删除成功！',"index.php?module=admin&act=action&tid=$tid&tb=$tb");
            }
            else
            {
                show('提示','删除失败！','-1');
            }
        }
        
        //批量删除
        if (isset($_POST['del']))
        {
            !isset($_POST['id']) && show('','没有选中项','-1');
            $rs = $db->delete_row($tbname,number($_POST['id']));
            if ($rs)
            {
                show('提示','批量删除成功！',URL);
            }
            else
            {
                show('提示','批量删除失败！','-1');
            }
        }
        
        $Page = new Page($tbname,"tid=$tid");
        $pageInfo = $Page->get_basic_info();
        $data = $Page->get_data();
        $buttonBasic = $Page->button_basic(0,0);
        $buttonSelect = $Page->button_select();
        $arr = array('pageInfo'=>$pageInfo,'data'=>$data,'buttonBasic'=>$buttonBasic,'buttonSelect'=>$buttonSelect,'tid'=>$tid,'tb'=>$tb);

        tpl($tbname,'arr',$arr);
    }
}
?>