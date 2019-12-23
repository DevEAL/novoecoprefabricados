<?php

class ModelEnlaces {

    public function SelectAll() {
        $db = new Entity('pt_Parameters');
        try {
            $db->select('value')
            ->where('name = "Email_contacto" AND status = 1');
            $sth = $db->execute();

            $response = $sth->fetch(PDO::FETCH_ASSOC);
            return $response;
        } catch (PDOException $e) {
            echo $e->getMessage();
            return false;
        }
    }
}