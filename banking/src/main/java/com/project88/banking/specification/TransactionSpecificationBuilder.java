package com.project88.banking.specification;

import org.springframework.data.jpa.domain.Specification;

import com.project88.banking.dto.filter.TransactionFilter;
import com.project88.banking.entity.TransactionHistory;

public class TransactionSpecificationBuilder {
    private TransactionFilter filter;

    public TransactionSpecificationBuilder(TransactionFilter filter) {
        this.filter = filter;
    }

    public Specification<TransactionHistory> build() {
        SearchCriteria startDateCriteria = new SearchCriteria("transactionDate", ">=", filter.getStartDate());
        SearchCriteria endDateCriteria = new SearchCriteria("transactionDate", "<=", filter.getEndDate());
        SearchCriteria name = new SearchCriteria("name", "Like", filter.getName());

        Specification<TransactionHistory> where = null;

        // start date filter
        if (filter.getStartDate() != null) {
            where = new TransactionSpecification(startDateCriteria);
        }

        // end date filter
        if (filter.getEndDate() != null) {
            if (where != null) {
                where = where.and(new TransactionSpecification(endDateCriteria));
            } else {
                where = new TransactionSpecification(endDateCriteria);
            }
        }

        if (filter.getName() != null && !filter.getName().isEmpty()) {
            if (where != null) {
                where = where.and(new TransactionSpecification(name));
            } else {
                where = new TransactionSpecification(name);
            }
        }

        return where;
    }
}
