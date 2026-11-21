(() => {
  const section = document.getElementById("servicios");
  const tablist = section.querySelector(".service-picker__tabs");
  const tabs = [...tablist.querySelectorAll("button")];
  const panels = [...section.querySelectorAll("[data-panel]")];

  function select(index) {
    tabs.forEach((tab, position) => {
      const active = position === index;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[position].hidden = !active;
    });
  }

  tablist.setAttribute("role", "tablist");
  tabs.forEach((tab, index) => {
    const panel = panels[index];
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panel.id);
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    tab.addEventListener("click", () => select(index));
    tab.addEventListener("keydown", event => {
      const indexByKey = {
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        ArrowRight: (index + 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      };
      const next = indexByKey[event.key];
      if (next === undefined) return;
      event.preventDefault();
      select(next);
      tabs[next].focus();
    });
  });

  select(0);
  tablist.hidden = false;
})();
