package com.base.coreapi.model.admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private Boolean active;

    @JsonIgnore
    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(name = "Admin_Permission",
            joinColumns = { @JoinColumn(name = "admin_id") },
            inverseJoinColumns = { @JoinColumn(name = "permission_id") })
    private Set<Permission> permissions;

    @JsonIgnore
    @OneToMany(mappedBy = "adminId")
    private List<AdminPasswordReset> adminPasswordResets;
}
