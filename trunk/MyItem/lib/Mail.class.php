<?php
class Mail
{
    /* Public Variables */
    var $smtp_port;
    var $time_out;
    var $host_name;
    var $log_file;
    var $relay_host;
    var $debug;
    var $auth;
    var $user;
    var $pass;
    /* Private Variables */
    var $sock;
    /* Constractor */
    function Mail($relay_host = "", $smtp_port = 25,$auth = false,$user,$pass)
    {
        $this->debug = FALSE;
        $this->smtp_port = $smtp_port;
        $this->relay_host = $relay_host;
        $this->time_out = 30; //is used in fsockopen()
        #
        $this->auth = $auth;//auth
        $this->user = $user;
        $this->pass = $pass;
        #
        $this->host_name = "localhost"; //is used in HELO command
        $this->log_file = "";

        $this->sock = FALSE;
    }
    /* Main Function */
    function sendmail($to, $from, $subject = "", $body = "", $mailtype, $cc = "", $bcc = "", $additional_headers = "")
    {
        $mail_from = $this->get_address($this->strip_comment($from));
        $body = ereg_replace("(^|(\r\n))(\.)", "\1.\3", $body);
        $header = '';
        $header .= "MIME-Version:1.0\r\n";
        if($mailtype=="HTML"){
            $header .= "Content-Type:text/html;charset=utf-8\r\n";
        }
        $header .= "To: ".$to."\r\n";
        if ($cc != "") {
            $header .= "Cc: ".$cc."\r\n";
        }
        $header .= "From: $from<".$from.">\r\n";
        $subject = "=?UTF-8?B?".base64_encode($subject)."?=";
        $header .= "Subject: ".$subject."\r\n";
        $header .= $additional_headers;
        $header .= "Date: ".date("r")."\r\n";
        $header .= "X-Mailer:By Redhat (PHP/".phpversion().")\r\n";
        list($msec, $sec) = explode(" ", microtime());
        $header .= "Message-ID: <".date("YmdHis", $sec).".".($msec*1000000).".".$mail_from.">\r\n";
        $TO = explode(",", $this->strip_comment($to));
        if ($cc != "") {
            $TO = array_merge($TO, explode(",", $this->strip_comment($cc)));
        }
        if ($bcc != "") {
            $TO = array_merge($TO, explode(",", $this->strip_comment($bcc)));
        }
        $sent = TRUE;
        foreach ($TO as $rcpt_to) {
            $rcpt_to = $this->get_address($rcpt_to);
            if (!$this->smtp_sockopen($rcpt_to)) {
                $this->log_write("Error: Cannot send email to ".$rcpt_to."\n");
                $sent = FALSE;
                continue;
            }
            if ($this->smtp_send($this->host_name, $mail_from, $rcpt_to, $header, $body)) {
                $this->log_write("E-mail has been sent to <".$rcpt_to.">\n");
            } else {
                $this->log_write("Error: Cannot send email to <".$rcpt_to.">\n");
                $sent = FALSE;
            }
            fclose($this->sock);
            $this->log_write("Disconnected from remote host\n");
        }
        return $sent;
    }

    /* Private Functions */

    function smtp_send($helo, $from, $to, $header, $body = "")
    {
        if (!$this->smtp_putcmd("HELO", $helo)) {
            return $this->smtp_error("sending HELO command");
        }
        #auth
        if($this->auth){
            if (!$this->smtp_putcmd("AUTH LOGIN", base64_encode($this->user))) {
                return $this->smtp_error("sending HELO command");
            }
            if (!$this->smtp_putcmd("", base64_encode($this->pass))) {
                return $this->smtp_error("sending HELO command");
            }
        }
        #
        if (!$this->smtp_putcmd("MAIL", "FROM:<".$from.">")) {
            return $this->smtp_error("sending MAIL FROM command");
        }
        if (!$this->smtp_putcmd("RCPT", "TO:<".$to.">")) {
            return $this->smtp_error("sending RCPT TO command");
        }
        if (!$this->smtp_putcmd("DATA")) {
            return $this->smtp_error("sending DATA command");
        }
        if (!$this->smtp_message($header, $body)) {
            return $this->smtp_error("sending message");
        }
        if (!$this->smtp_eom()) {
            return $this->smtp_error("sending <CR><LF>.<CR><LF> [EOM]");
        }
        if (!$this->smtp_putcmd("QUIT")) {
            return $this->smtp_error("sending QUIT command");
        }
        return TRUE;
    }
    function smtp_sockopen($address)
    {
        if ($this->relay_host == "") {
            return $this->smtp_sockopen_mx($address);
        } else {
            return $this->smtp_sockopen_relay();
        }
    }
    function smtp_sockopen_relay()
    {
        $this->log_write("Trying to ".$this->relay_host.":".$this->smtp_port."\n");
        $this->sock = @fsockopen($this->relay_host, $this->smtp_port, $errno, $errstr, $this->time_out);
        if (!($this->sock && $this->smtp_ok())) {
            $this->log_write("Error: Cannot connenct to relay host ".$this->relay_host."\n");
            $this->log_write("Error: ".$errstr." (".$errno.")\n");
            return FALSE;
        }
        $this->log_write("Connected to relay host ".$this->relay_host."\n");
        return TRUE;;
    }

    function smtp_sockopen_mx($address)
    {
        $domain = ereg_replace("^.+@([^@]+)$", "\1", $address);
        if (!@getmxrr($domain, $MXHOSTS)) {
            $this->log_write("Error: Cannot resolve MX \"".$domain."\"\n");
            return FALSE;
        }
        foreach ($MXHOSTS as $host) {
            $this->log_write("Trying to ".$host.":".$this->smtp_port."\n");
            $this->sock = @fsockopen($host, $this->smtp_port, $errno, $errstr, $this->time_out);
            if (!($this->sock && $this->smtp_ok())) {
                $this->log_write("Warning: Cannot connect to mx host ".$host."\n");
                $this->log_write("Error: ".$errstr." (".$errno.")\n");
                continue;
            }
            $this->log_write("Connected to mx host ".$host."\n");
            return TRUE;
        }
        $this->log_write("Error: Cannot connect to any mx hosts (".implode(", ", $MXHOSTS).")\n");
        return FALSE;
    }

    function smtp_message($header, $body)
    {
        fputs($this->sock, $header."\r\n".$body);
        $this->smtp_debug("> ".str_replace("\r\n", "\n"."> ", $header."\n> ".$body."\n> "));

        return TRUE;
    }

    function smtp_eom()
    {
        fputs($this->sock, "\r\n.\r\n");
        $this->smtp_debug(". [EOM]\n");

        return $this->smtp_ok();
    }

    function smtp_ok()
    {
        $response = str_replace("\r\n", "", fgets($this->sock, 512));
        $this->smtp_debug($response."\n");

        if (!ereg("^[23]", $response)) {
            fputs($this->sock, "QUIT\r\n");
            fgets($this->sock, 512);
            $this->log_write("Error: Remote host returned \"".$response."\"\n");
            return FALSE;
        }
        return TRUE;
    }
    function smtp_putcmd($cmd, $arg = "")
    {
        if ($arg != "") {
            if($cmd=="") $cmd = $arg;
            else $cmd = $cmd." ".$arg;
        }
        fputs($this->sock, $cmd."\r\n");
        $this->smtp_debug("> ".$cmd."\n");
        return $this->smtp_ok();
    }
    function smtp_error($string)
    {
        $this->log_write("Error: Error occurred while ".$string.".\n");
        return FALSE;
    }
    function log_write($message)
    {
        $this->smtp_debug($message);
        if ($this->log_file == "") {
            return TRUE;
        }
        $message = date("M d H:i:s ").get_current_user()."[".getmypid()."]: ".$message;
        if (log_file>!@file_exists($this->log_file) || !($fp = @fopen($this->log_file, "a"))) {
            $this->smtp_debug("Warning: Cannot open log file \"".$this->log_file."\"\n");
            return FALSE;;
        }
        flock($fp, LOCK_EX);
        fputs($fp, $message);
        fclose($fp);

        return TRUE;
    }

    function strip_comment($address)
    {
        $comment = "\([^()]*\)";
        while (ereg($comment, $address)) {
            $address = ereg_replace($comment, "", $address);
        }

        return $address;
    }

    function get_address($address)
    {
        $address = ereg_replace("([ \t\r\n])+", "", $address);
        $address = ereg_replace("^.*<(.+)>.*$", "\1", $address);
        return $address;
    }
    function smtp_debug($message)
    {
        if ($this->debug) {
            echo $message;
        }
    }
}

/*function sendRegistMail($email,$nickName,$id,$tmp_key)
{
    include_once('common/Mail.class.php');
    $smtpServ = 'smtp.sina.com';
    $smtpServPort = '25';
    $servUser = 'j5mbbs';
    $servUserMail = 'j5mbbs@sina.com';
    $servPWD = 'j5mbbs2010';
    $Mail = new Mail($smtpServ,$smtpServPort,true,$servUser,$servPWD);
    
    $url = 'http://www.group.com/index.php?module=users&act=regist&id='.$id.'&tmp_key='.$tmp_key;
    $mailBody = '新爱的<b>'.$nickName.'</b>:<br><br>';
    $mailBody .= '欢迎加入精武门社区!<br><br>请点击下面的链接完成注册：<br><br>';
    $mailBody .= "<a href=$url>".$url."</a><br><br>";
    $mailBody .= "如果以上链接无法点击，请将上面的地址复制到你的浏览器(如IE)的地址栏进入精武门社区。<br><br>";
    $mailBody .= "--J5M社区<br><br>(这是一封自动产生的email，请勿回复。)";
    $mailSubject = '请激活你的帐号，完成注册';
    $mailType = 'HTML';
    $sendRegistMail = $Mail->sendmail($email,$servUserMail,$mailSubject,$mailBody,$mailType);
    return $sendRegistMail ? true : false;
}*/
?>