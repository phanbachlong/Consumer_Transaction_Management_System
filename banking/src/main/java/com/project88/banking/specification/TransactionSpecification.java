package com.project88.banking.specification;

import org.springframework.data.jpa.domain.Specification;

import com.project88.banking.entity.TransactionHistory;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class TransactionSpecification implements Specification<TransactionHistory> {

    private static final long serialVersionUID = 1L;
    private SearchCriteria criteria;

    public TransactionSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<TransactionHistory> root, CriteriaQuery<?> query,
            CriteriaBuilder criteriaBuilder) {

        if (criteria.getOperator().equalsIgnoreCase("Like")) {
            return criteriaBuilder.like(root.get(criteria.getKey()), "%" + criteria.getValue() + "%");
        }

        if (criteria.getOperator().equalsIgnoreCase(">=")) {
            return criteriaBuilder.greaterThanOrEqualTo(root.get(criteria.getKey()), criteria.getValue().toString());
        }

        if (criteria.getOperator().equalsIgnoreCase("<=")) {
            return criteriaBuilder.lessThanOrEqualTo(root.get(criteria.getKey()), criteria.getValue().toString());
        }

        return null;
    }

}
