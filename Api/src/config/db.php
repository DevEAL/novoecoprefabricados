<?php

class Entity {
    private $_db;
    private $_table;
    private $_sql;
    private $_id;

    public function __construct($table)
    {
        $options = parse_ini_file('config-db.ini');

        try {
            $this->_db = new PDO(
                $options['driver'] .
                ":host={$options['host']}" .
                ";port={$options['port']}" .
                ";dbname={$options['name']}",
                $options['user'],
                $options['password']
            );
            $this->_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->_db->exec("set names utf8");
        } catch (PDOException $e){
            echo "Connection Error: {$e->getMessage()}";
            exit;
        }
        $this->_table = $table;
    }

    public function joinFields ($fields, $delimiter = ',') {
        $fields_pair = [];
        foreach ($fields as $key => $value) {
            array_push($fields_pair, "{$key} = {$value}");
        }
        return implode($delimiter, $fields_pair);
    }

    public function quote ($string) {
        return $this->_db->quote($string);
    }

    public function select ($fields) {
        $str_fields = is_string($fields) ? $fields : implode(',',$fields);
        $this->_sql = "SELECT {$str_fields} FROM {$this->_table}";
        return $this;
    }

    public function where ($conditions){
        $str_conditions = is_string($conditions) ? $conditions : $this->joinFields($conditions, ' AND ');
        $this->_sql .= " WHERE {$str_conditions}";
        return $this;
    }

    public function insert($fields) {
        $key = implode(',', array_keys($fields));
        $values = implode(',', array_values($fields));
        $this->_sql = "INSERT INTO {$this->_table} ({$key}) VALUES ({$values})";
        return $this;
    }

    public function execute (Array $fields = []) {
        $sth = $this->_db->prepare($this->_sql);
        $sth->execute($fields);
        return $sth;
    }

    public function execute_id (Array $fields = []) {
        $sth = $this->_db->prepare($this->_sql);
        $sth->execute($fields);
        $this->_id = $this->_db->lastInsertId();
        return $this->_id;
    }
    public function table_name($table){
        $this->_table = $table;
        return $this;
    }
}