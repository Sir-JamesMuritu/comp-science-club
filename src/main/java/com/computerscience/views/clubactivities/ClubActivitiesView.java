package com.computerscience.views.clubactivities;

import com.computerscience.views.MainLayout;
import com.vaadin.flow.component.HasComponents;
import com.vaadin.flow.component.HasStyle;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Main;
import com.vaadin.flow.component.html.OrderedList;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.flow.theme.lumo.LumoUtility.AlignItems;
import com.vaadin.flow.theme.lumo.LumoUtility.Display;
import com.vaadin.flow.theme.lumo.LumoUtility.FontSize;
import com.vaadin.flow.theme.lumo.LumoUtility.Gap;
import com.vaadin.flow.theme.lumo.LumoUtility.JustifyContent;
import com.vaadin.flow.theme.lumo.LumoUtility.ListStyleType;
import com.vaadin.flow.theme.lumo.LumoUtility.Margin;
import com.vaadin.flow.theme.lumo.LumoUtility.MaxWidth;
import com.vaadin.flow.theme.lumo.LumoUtility.Padding;
import com.vaadin.flow.theme.lumo.LumoUtility.TextColor;

@PageTitle("Club Activities")
@Route(value = "Activities", layout = MainLayout.class)
@AnonymousAllowed
public class ClubActivitiesView extends Main implements HasComponents, HasStyle {

    private OrderedList imageContainer;

    public ClubActivitiesView() {
        constructUI();

        imageContainer.add(new ClubActivitiesViewCard("Snow mountains under stars",
                "https://i.postimg.cc/85jxvdjJ/20230616111930-IMG-8351-1.jpg"));
        imageContainer.add(new ClubActivitiesViewCard("Snow covered mountain",
                "https://i.postimg.cc/W38cmp7C/Lion-Hacker.png"));
        imageContainer.add(new ClubActivitiesViewCard("River between mountains",
                "https://i.postimg.cc/3wLPWfJQ/20230616112211-IMG-8354.jpg"));
        imageContainer.add(new ClubActivitiesViewCard("Milky way on mountains",
                "https://i.postimg.cc/y8psJyP9/Whats-App-Image-2024-09-03-at-11-43-41-1.jpg"));
        imageContainer.add(new ClubActivitiesViewCard("Mountain with fog",
                "https://i.postimg.cc/bNTzPhSm/Whats-App-Image-2024-09-03-at-11-43-41-3.jpg"));
        imageContainer.add(new ClubActivitiesViewCard("Mountain at night",
                "https://images.unsplash.com/photo-1562832135-14a35d25edef?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=815&q=80"));

    }

    private void constructUI() {
        addClassNames("club-activities-view");
        addClassNames(MaxWidth.SCREEN_LARGE, Margin.Horizontal.AUTO, Padding.Bottom.LARGE, Padding.Horizontal.LARGE);

        HorizontalLayout container = new HorizontalLayout();
        container.addClassNames(AlignItems.CENTER, JustifyContent.BETWEEN);

        VerticalLayout headerContainer = new VerticalLayout();
        H2 header = new H2("Computer Science Club Galary");
        header.addClassNames(Margin.Bottom.NONE, Margin.Top.XLARGE, FontSize.XXXLARGE);
        Paragraph description = new Paragraph("Explore Our Exciting Range of Activities");
        description.addClassNames(Margin.Bottom.XLARGE, Margin.Top.NONE, TextColor.SECONDARY);
        headerContainer.add(header, description);

        Select<String> sortBy = new Select<>();
        sortBy.setLabel("Sort by");
        sortBy.setItems("Popularity", "Newest first", "Oldest first");
        sortBy.setValue("Popularity");

        imageContainer = new OrderedList();
        imageContainer.addClassNames(Gap.MEDIUM, Display.GRID, ListStyleType.NONE, Margin.NONE, Padding.NONE);

        container.add(headerContainer, sortBy);
        add(container, imageContainer);

    }
}
