package com.springboot.storparameterekeys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeyValueRepository extends JpaRepository<KeyValue, String> {}
