<?php

class ControllerEnlaces {
    public $model;

    public function __construct()
    {
        $this->model = new ModelEnlaces();
    }
    public function SelectAll () {
        $response = $this->model->SelectAll();

        if (empty($response)) {
            return 203;
        } elseif (is_array($response)) {
            return array(200, $response);
        } elseif ($response === false) {
            return 503;
        } else {
            return 201;
        }
    }
}