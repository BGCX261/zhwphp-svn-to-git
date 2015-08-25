<script type="text/javascript">
function getTime(time)
{
    time += 1000;
    var d = new Date();
    d.setTime(time);
    document.getElementById('clock').innerHTML = (d.toLocaleString());
    setTimeout("getTime("+time+")",1000);
}
</script>
<body onload="getTime(<?php echo time().'000'; ?>)">
<div id="clock" style="background:#ccc;width:200px;"></div>
</body>