<?php
$listDir = '';
$articleDir = '';
$dir = dir($list);
while (false!==($filename=$dir->read())) {
    //Ignore parent- and self-links
    if ($filename=="." || $filename=="..") continue;

    $filepath = $listDir . DIRECTORY_SEPARATOR . $filename;
    if (! is_file($filepath)) {
        continue;
    }

    $fileContent = file_get_contents($filepath);
    preg_match_all('/<dt>*<\/dt>/ig', $fileContent, $matchList);
}

/* EOF */
