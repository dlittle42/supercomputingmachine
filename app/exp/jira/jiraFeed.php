<?php 

$name = 'derek.little';
$pass = 'sputnik';




//function getJobs(){

	if (isset($_POST['name']) && !empty($_POST['name'])) $name = json_decode(stripslashes($_POST['name']));
	if (isset($_POST['pass']) && !empty($_POST['pass'])) $pass = json_decode(stripslashes($_POST['pass']));

	//$url = 'http://jira.truenorthinc.com/rest/api/2/issue/DVA-141';
	$url = 'http://jira.truenorthinc.com/rest/api/2/search?jql=assignee%20in%20(%22'.$name.'%40truenorthinc.com%22)';

	$curl = curl_init();


	curl_setopt($curl, CURLOPT_USERPWD, "$name:$pass");

	curl_setopt($curl, CURLOPT_URL, $url);

	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);

	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);

	$issue_list = (curl_exec($curl));

	echo $issue_list;




	die;
	
	$data = json_decode($issue_list);
/*
	foreach($data->issues as $issue) {
		echo $issue->key.' --- ';
		echo $issue->fields->summary.'</br>';
	}
	*/



//}

?>