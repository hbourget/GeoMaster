package com.ics.geomaster.country.models;

import java.util.List;

public class ApiResponse {
    private List<Country> data;
    public List<Country> getData() {
        return data;
    }
    public void setData(List<Country> data) {
        this.data = data;
    }
}

