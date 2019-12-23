<?php

class PrintJson {
    private static $CodeResponse = array(
        200 => 'OK',
        201 => 'Create',
        203 => 'Empty query',
        503 => 'Storage error in Data Base',
        404 => 'Url Error'
    );

    static function print ($code, $message = '', $path = '', $subResponse = array(), $optional = array()) {
        $messageResponse = self::$CodeResponse[$code];

        header("HTTP/1.1 $code $messageResponse");
        header("Content-Type: application/json;charset=UTF-8");

        if ($optional == null) {
            $data = array (
                'message' => $message,
                'error' => $code == 200 ? true : false,
                "$path" => $subResponse
            );
        } else {
            foreach ($subResponse as $key => $value) {
                array($data[$key] = $value);
            }
        }

        if ($path == '') {
            unset($data["$path"]);
        }

        $response['statusCode'] = $code;
        $response['statusMessage'] = $messageResponse;
        $response['data'] = $data;

        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }
}