<?php

    /*服务端代理，实现跨域*/
    $url1 = 'https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

    $url2 = 'https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

    $recResult = file_get_contents($url1);
    $allResult = file_get_contents($url2);

    $recResult = json_decode($recResult);//转成php数组
    $allResult = json_decode($allResult);

    $result = array('rec'=>$recResult,'all'=>$allResult);

    echo json_encode($result);

?>