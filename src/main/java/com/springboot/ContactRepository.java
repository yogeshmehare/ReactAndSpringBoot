package com.springboot;

import com.springboot.entity.Contact;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Repository
public class ContactRepository implements JpaRepository<Contact,Integer> {
    @Override
    public void flush() {

    }

    @Override
    public <S extends Contact> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends Contact> List<S> saveAllAndFlush(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public void deleteAllInBatch(Iterable<Contact> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Integer> integers) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public Contact getOne(Integer integer) {
        return null;
    }

    @Override
    public Contact getById(Integer integer) {
        return null;
    }

    @Override
    public Contact getReferenceById(Integer integer) {
        return null;
    }

    @Override
    public <S extends Contact> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends Contact> List<S> findAll(Example<S> example) {
        return List.of();
    }

    @Override
    public <S extends Contact> List<S> findAll(Example<S> example, Sort sort) {
        return List.of();
    }

    @Override
    public <S extends Contact> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends Contact> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends Contact> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends Contact, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends Contact> S save(S entity) {
        return null;
    }

    @Override
    public <S extends Contact> List<S> saveAll(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public Optional<Contact> findById(Integer integer) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Integer integer) {
        return false;
    }

    @Override
    public List<Contact> findAll() {
        return List.of();
    }

    @Override
    public List<Contact> findAllById(Iterable<Integer> integers) {
        return List.of();
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Integer integer) {

    }

    @Override
    public void delete(Contact entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Integer> integers) {

    }

    @Override
    public void deleteAll(Iterable<? extends Contact> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<Contact> findAll(Sort sort) {
        return List.of();
    }

    @Override
    public Page<Contact> findAll(Pageable pageable) {
        return null;
    }
}
