<?php

class ControllerCotizar {
    public $model;

    public function __construct()
    {
        $this->model = new ModelCotizar();
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
    public function Insert($request) {
        $response = $this->model->Insert($request);

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