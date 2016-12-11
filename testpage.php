<?php
include("common.php");
$usr = $_POST["name"];
$pass = $_POST["password"];
//if either field was left blank
if(strcmp($usr, "") == 0 || strcmp($pass, "") == 0){
	die("Missing usr or pass");
}
//create array, and populate with users from file
$users = array();
forEach(file("users.txt") as $userpass){
	//get username, password
	$password = trim(explode(":", $userpass)[1]);
	$username = explode(":", $userpass)[0];
	//add to array
	$users[$username] = $password;
}
//if entered username is a prexisting user
if(in_array($usr, array_keys($users))){
	//check password, login
	if(strcmp($users[$usr], $pass) == 0){
		startSession($usr, $pass);
	}else{
		gotoStart();
	}
}else{
	//check to see if username/password entered are valid
	if(preg_match("/^[a-z]([a-z]|\d){2,7}$/i", $usr)==1 && preg_match("/^\d.{4,10}\W$/", $pass)){
		//create user and log in
		file_put_contents("users.txt", "\n".$usr.":".$pass,
				FILE_APPEND);
		startSession($usr, $pass);
	}else{
		gotoStart();
	}
}
//create login session
function startSession($usr, $pass){
	//clear any prexisting session
	clearSession();
	session_start();
	//set cookie for login time
	setcookie("lastLogin", date("D y M d, g:i:s a"), time() + 60*60*24*7);
	//set session data
	$_SESSION["usr"] = $usr;
	$_SESSION["pass"] = $pass;
	gotoList();
}
?>