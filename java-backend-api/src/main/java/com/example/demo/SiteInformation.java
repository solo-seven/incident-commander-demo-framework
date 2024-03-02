package com.example.demo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SiteInformation {
    private Integer version = 0;

    private List<String> featureFlags = new ArrayList<>();

    private SimulationScenario currentScenario = SimulationScenario.ALL_GOOD;

    public SiteInformation(final String[] featureFlags) {
        this(featureFlags, SimulationScenario.ALL_GOOD);
    }
    public SiteInformation(final String[] featureFlags, final SimulationScenario scenario) {
        this.featureFlags.addAll(Arrays.asList(featureFlags));
        this.currentScenario = scenario;
    }
    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public List<String> getFeatureFlags() {
        return featureFlags;
    }

    public void setFeatureFlags(List<String> featureFlags) {
        this.featureFlags = featureFlags;
    }

    public SimulationScenario getCurrentScenario() {
        return currentScenario;
    }

    public void setCurrentScenario(SimulationScenario currentScenario) {
        this.currentScenario = currentScenario;
    }
}
