<?php
$phpversion = PHP_VERSION;
echo 
<<<EOF
    <br><br>
    <table width=600 align=center>
        <tr><th style='font-size:50px;'>Functions of PHP $phpversion</th></tr>
        <tr><td align=right><a href=phpfunc.rar>DownLoad</a></td></tr>
    </table><br><br>
EOF;
$type = get_loaded_extensions();
foreach ($type as $v)
{
    $arr = get_extension_funcs($v);
    $num = count($arr);
    echo
<<<EOF
    <table width=500 align=center>
        <tr><td><font color=red size=6><b>$v</b></font><font size=4 color=red>($num)</font></td></tr>
    </table>
EOF;
    $i = 1;
    if($arr != array())
    {
        echo
<<<EOF
        <table width=500 align=center>
                <tr bgcolor=yellow><th>NO.</th><th>Function</th><th colspan=2>Search</th></tr>
EOF;
        foreach ($arr as $v)
        {
            echo
<<<EOF
                <tr>
                    <td width=20>$i</td>
                    <td width=280>$v</td>
                    <td width=50><a href=http://www.baidu.com/s?wd=php+$v target=_blank>baidu</a></td>
                    <td width=50><a href=http://www.google.cn/search?q=php+$v target=_blank>google</a></td>
                </tr>
EOF;
            $i++;
        }
        echo "</table>";
    }
    else 
    {
        echo
<<<EOF
    <table width=500 align=center>
        <tr><td><font color=blue>No Functions</font></td></tr>
    </table>
EOF;
    }
    echo "<br>";
}
?> 