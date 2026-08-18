<?php
header('Content-Type: application/json');

$stateFile = __DIR__ . '/state.json';

if (!file_exists($stateFile)) {
    file_put_contents($stateFile, json_encode(['bulbs' => array_fill(0,4,false)], JSON_PRETTY_PRINT));
}

$method = $_SERVER['REQUEST_METHOD'];

function read_state($file) {
    $s = file_get_contents($file);
    return json_decode($s, true);
}
function write_state($file, $data) {
    $fp = fopen($file, 'c+');
    if (!$fp) return false;
    if (flock($fp, LOCK_EX)) {
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
        fflush($fp);
        flock($fp, LOCK_UN);
    }
    fclose($fp);
    return true;
}

if ($method === 'GET') {
    echo json_encode(read_state($stateFile));
    exit;
}

$input = $_POST;
if (empty($input)) {
    $body = file_get_contents('php://input');
    $json = json_decode($body, true);
    if ($json) $input = $json;
}

$action = isset($input['action']) ? $input['action'] : null;
$state = read_state($stateFile);

if ($action === 'toggle' && isset($input['index'])) {
    $i = intval($input['index']);
    if (isset($state['bulbs'][$i])) {
        $state['bulbs'][$i] = !$state['bulbs'][$i];
        write_state($stateFile, $state);
        echo json_encode(['success'=>true,'state'=>$state]);
        exit;
    }
}

if ($action === 'set' && isset($input['index']) && isset($input['value'])) {
    $i = intval($input['index']);
    $v = filter_var($input['value'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
    $state['bulbs'][$i] = $v?true:false;
    write_state($stateFile, $state);
    echo json_encode(['success'=>true,'state'=>$state]);
    exit;
}

if ($action === 'set_count' && isset($input['count'])) {
    $count = max(0,intval($input['count']));
    $cur = count($state['bulbs']);
    if ($count > $cur) {
        for ($i=0;$i<$count-$cur;$i++) $state['bulbs'][] = false;
    } else {
        $state['bulbs'] = array_slice($state['bulbs'],0,$count);
    }
    write_state($stateFile, $state);
    echo json_encode(['success'=>true,'state'=>$state]);
    exit;
}

echo json_encode(['success'=>false,'error'=>'invalid request','state'=>$state]);
exit;
