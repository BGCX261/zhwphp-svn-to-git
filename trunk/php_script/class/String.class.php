<?php
/**
 * ------------------------------
 * �ַ�������ࣨ��̬�ࣩ
 * ------------------------------
 * @name   String.class.php
 * @author �ź�ΰ mail@zhwphp.com
 * charset gbk
 */

class String
{
    /**
     * ------------------------------
     * �ַ����������ȡ�����ֽڽ�ȡ��
     * ------------------------------
     * @param  string $str Ҫ��ȡ���ַ���
     * @param  int $start ��ʼ��ȡλ��
     * @param  int $length ��ȡ����
     * @param  string $charset �ַ�������
     * @param  string $suffix ��ȡ����ʾ��ʡ�Է�
     * @return string
     */
    static function substr($str, $start=0, $length, $charset="gbk", $suffix='...')
    {
        $string = substr($str,$start,$length);
        $re['utf-8']   = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
        $re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
        $re['gbk']    = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
        $re['big5']   = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
        preg_match_all($re[$charset], $string, $match);
        $slice = join('',array_slice($match[0], 0, $length));
        return strlen($str) > strlen($slice) ? $slice.$suffix : $slice;
    }

    /**
     * ------------------------------
     * ����ַ����Ƿ�ΪUTF-8����
     * ------------------------------
     * @param  string $string �ַ���
     * @return bool
     */
    static function is_utf8($string)
    {
        return preg_match('%^(?:
		 [\x09\x0A\x0D\x20-\x7E]            # ASCII
	   | [\xC2-\xDF][\x80-\xBF]             # non-overlong 2-byte
	   |  \xE0[\xA0-\xBF][\x80-\xBF]        # excluding overlongs
	   | [\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}  # straight 3-byte
	   |  \xED[\x80-\x9F][\x80-\xBF]        # excluding surrogates
	   |  \xF0[\x90-\xBF][\x80-\xBF]{2}     # planes 1-3
	   | [\xF1-\xF3][\x80-\xBF]{3}          # planes 4-15
	   |  \xF4[\x80-\x8F][\x80-\xBF]{2}     # plane 16
       )*$%xs', $string);
    }
}
?>