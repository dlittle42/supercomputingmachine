<?php 
$img=$_GET['img'];
//$url = "http://dev.truenorthinc.com/upload4/files/newimages/";
$url = "http://a51.abcfamily.go.com/movies/natureofthebeast/games/files/newimages/";
$photo ='<img src="'.$url.$img.'.jpg" width="186" height="236" alt="">';
//echo $photo;
?>
<html>
<head>
<title>Werewolf Yourself!</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
<body bgcolor="#003366" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<!-- ImageReady Slices (photoFrame2.psd) -->
<div align="center">
<table id="Table_01" width="600" height="500" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td>
			<img src="images/beast_photoFrame_01.jpg" width="366" height="106" alt=""></td>
		<td>
			<img src="images/beast_photoFrame_02.jpg" width="186" height="106" alt=""></td>
		<td>
			<img src="images/beast_photoFrame_03.jpg" width="48" height="106" alt=""></td>
	</tr>
	<tr>
		<td>
			<img src="images/beast_photoFrame_04.jpg" width="366" height="236" alt=""></td>
		<td>
			<?php echo $photo; ?></td>
		<td>
			<img src="images/beast_photoFrame_06.jpg" width="48" height="236" alt=""></td>
	</tr>
	<tr>
		<td>
			<img src="images/beast_photoFrame_07.jpg" width="366" height="60" alt=""></td>
		<td>
			<img src="images/beast_photoFrame_08.jpg" width="186" height="60" border="0" alt="" usemap="#beast_photoFrame_08_Map"></td>
		<td>
			<img src="images/beast_photoFrame_09.jpg" width="48" height="60" alt=""></td>
	</tr>
	<tr>
		<td>
			<img src="images/beast_photoFrame_10.jpg" width="366" height="98" alt=""></td>
		<td>
			<img src="images/beast_photoFrame_11.jpg" width="186" height="98" alt=""></td>
		<td>
			<img src="images/beast_photoFrame_12.jpg" width="48" height="98" alt=""></td>
	</tr>
</table>
<map name="beast_photoFrame_08_Map">
<area shape="rect" alt="" coords="5,15,185,48" href="http://sneakpeek.abcfamily.go.com/abcfamily/path/section_Specials+13-Nights/page_Werewolf-Game" target="_self">
</map>
</div>
<!-- End ImageReady Slices -->
</body>
</html>