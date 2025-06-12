package com.project88.banking.specification;

import org.springframework.data.jpa.domain.Specification;

import com.project88.banking.dto.filter.UserFilter;
import com.project88.banking.entity.User;

public class UserSpecificationBuilder {

    private UserFilter userFilter;

    public UserSpecificationBuilder(UserFilter userFilter) {
        this.userFilter = userFilter;
    }

    public Specification<User> build() {
        SearchCriteria name = new SearchCriteria("name", "Like", userFilter.getName());

        Specification<User> where = null;

        // name search
        if (userFilter.getName() != null && !userFilter.getName().isEmpty()) {
            where = new UserSpecification(name);
        }
        return where;
    }
}
