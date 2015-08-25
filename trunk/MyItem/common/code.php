<?php
header("Content-type: image/gif");
@session_start();
$im = imagecreate(60,22);
$ii = 4;
$start = 0;
$code  = '';
for ($i=1; $i<=$ii; $i++)
{
    $src = imagecreate(15,22);
    $srcbgcolor  = imagecolorallocate($src, 255,255,255);
    $color = array(imagecolorallocate($src,0,255,0),imagecolorallocate($src,0,0,255),imagecolorallocate($src,255,0,0));
    $srctxtcolor = $color[mt_rand(0,2)];
    $str="ACEFGHJKLMNPQRTUVWXYabcdefghjkmnpqrstuvwxy123456789";
    $text   = $str[mt_rand(0,50)];
    $angle  = rand(-20,20);
    $size   = 10;
    $x      = $angle>-20?5:0;
    $code  .= $text;
    imagettftext($src, $size, $angle, $x, 15, $srctxtcolor, "../public/resource/trebucbd.ttf",$text);
    imagecopy ($im, $src, $start, 0, 0, 0, 20, 30);
    $start += 15;
    imagedestroy($src);
}
$_SESSION['authCode'] = strtolower($code);
imagegif($im);
imagedestroy($im);
?> 