document.addEventListener("DOMContentLoaded", () => {
  const gender = instantiateGender();
  let section = localStorage.getItem("section") ?? "Exercises";
  $(".js-sex-option").on("change", (e) => {
    showGenderSelection(e.target.value);
  });
  $("#body-map").on("click", (event) => {
    const bodyPart = event.target.parentElement.id;
    const navigationPath = buildNavigationPath(bodyPart, section);
    if (navigationPath) {
      window.location = navigationPath;
    }
  });
  $(`#sexchooser${gender}label`).click();
  document.onclick = () => {
    $moreMenu.removeClass("more-menu--open");
    $mobileMenu.removeClass("mobile-menu--open");
  };
  var $moreMenu = $(".js-more-menu"),
    $mobileMenu = $(".js-mobile-menu"),
    $mobileToggleLabel = $(".js-toggle-button-label"),
    $showMoreButton = $(".js-show-more-button"),
    $showMoreButtonLabel = $(".js-category-display"),
    optDeselect = false;
  $(".section-selected").removeClass("section-selected");
  $(`[data-js-section="${section}"]`).addClass("section-selected");
  let selectedText = $(".section-selected").first().text();
  $mobileToggleLabel.text(selectedText || "Featured");
  if ($(".section-selected").hasClass("more-menu-opt")) {
    $showMoreButton.addClass("section-selected");
    $showMoreButtonLabel.text(selectedText);
  }
  $(".js-mobile-menu-toggle").on("click", (e) => {
    $mobileMenu.toggleClass("mobile-menu--open");
    e.stopPropagation();
  });
  $(".js-section-button").on("click", (e) => {
    let $button = $(e.target),
      oldSection = localStorage.getItem("section"),
      newSection = $button.data("js-section");
    optDeselect = false;
    $showMoreButtonLabel.text("More");
    $(".section-selected").removeClass("section-selected");
    localStorage.removeItem("section");
    $mobileToggleLabel.text("Featured");
    if (newSection === oldSection) {
      optDeselect = true;
      $showMoreButton.removeClass("section-selected");
      return;
    }
    $mobileToggleLabel.text($button.text());
    $button.addClass("section-selected");
    section = newSection;
    localStorage.setItem("section", newSection);
  });
  $(".js-more-menu-opt").on("click", (e) => {
    if (optDeselect) {
      return;
    }
    $showMoreButton.addClass("section-selected");
    $showMoreButtonLabel.text($(e.target).text());
  });
  $showMoreButton.on("click", (e) => {
    $moreMenu.toggleClass("more-menu--open");
    e.stopPropagation();
  });
});
function instantiateGender() {
  let gender = localStorage.getItem("sex");
  if (gender !== "male" && gender !== "female") {
    localStorage.setItem("sex", "male");
    gender = "male";
  }
  return gender;
}
function showGenderSelection(gender) {
  const maleBodyMap = $("#male-body-maps");
  const femaleBodyMap = $("#female-body-maps");
  switch (gender) {
    case "female": {
      localStorage.setItem("sex", "female");
      maleBodyMap.hide();
      femaleBodyMap.show();
      break;
    }
    case "male": {
      localStorage.setItem("sex", "male");
      femaleBodyMap.hide();
      maleBodyMap.show();
      break;
    }
    default: {
      localStorage.setItem("sex", "male");
      femaleBodyMap.hide();
      maleBodyMap.show();
      break;
    }
  }
}

function buildNavigationPath(bodyPart, section) {
  const validBodyParts = [
    "calves",
    "quads",
    "traps",
    "shoulders",
    "biceps",
    "triceps",
    "forearms",
    "lowerback",
    "hamstrings",
    "obliques",
    "chest",
    "abdominals",
    "quads",
    "lats",
    "glutes",
    "traps_middle",
  ];
  if (validBodyParts.includes(bodyPart)) {
    const gender = localStorage.getItem("sex");
    return [section, gender, bodyPart].join("/");
  }
}
