package com.project88.banking.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;

import com.project88.banking.entity.User;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class UserSpecification implements Specification<User> {

    private static final long serialVersionUID = 1L;
    private SearchCriteria criteria;

    public UserSpecification(SearchCriteria searchCriteria) {
        this.criteria = searchCriteria;
    }

    @Override
    public Predicate toPredicate(Root<User> root, @Nullable CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

        if ("like".equalsIgnoreCase(criteria.getOperator()) && criteria.getValue() != null) {
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get(criteria.getKey())),
                    "%" + criteria.getValue().toString().toLowerCase() + "%");
        }
        return null;
    }

}
