<?php
$username = 'derek.little';

$password = 'sputnik';

//$url = 'http://jira.truenorthinc.com/rest/api/2/issue/DVA-141';
$url = 'http://jira.truenorthinc.com/rest/api/2/search?jql=assignee%20in%20(%22cameron.moore%40truenorthinc.com%22)';

$curl = curl_init();


curl_setopt($curl, CURLOPT_USERPWD, "$username:$password");

curl_setopt($curl, CURLOPT_URL, $url);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);

curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);

$issue_list = (curl_exec($curl));

//echo $issue_list;

$data = json_decode($issue_list);

foreach($data->issues as $issue) {
	echo $issue->key.' --- ';
	echo $issue->fields->summary.'</br>';
}


?>