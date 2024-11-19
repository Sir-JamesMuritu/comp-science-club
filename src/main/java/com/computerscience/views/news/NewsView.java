package com.computerscience.views.news;

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

@PageTitle("News")
@Route(value = "News", layout = MainLayout.class)
@AnonymousAllowed
public class NewsView extends Main implements HasComponents, HasStyle {

    private OrderedList imageContainer;

    public NewsView() {
        constructUI();

        imageContainer.add(new NewsViewCard(
                "Hackathon Success: HACK IT 2024 Student Hackathon",
                "https://i.postimg.cc/13m0XNch/IMG-20240203-142528.jpg",
                "September 1, 2024",
                "Our club members recently participated...",
                "Our club members recently participated in the national hackathon held at XYZ University, where they showcased their skills and creativity. Competing against teams from various institutions, our team developed a mobile app for smart waste management, which won first place! This achievement highlights our commitment to innovation and excellence in technology."
        ));
        imageContainer.add(new NewsViewCard(
                "Hackathon Success: HACK IT 2024 Student Hackathon",
                "https://i.postimg.cc/13m0XNch/IMG-20240203-142528.jpg",
                "September 1, 2024",
                "Our club members recently participated...",
                "Our club members recently participated in the national hackathon held at XYZ University, where they showcased their skills and creativity. Competing against teams from various institutions, our team developed a mobile app for smart waste management, which won first place! This achievement highlights our commitment to innovation and excellence in technology."
        ));

    }

    private void constructUI() {
        addClassNames("news-view");
        addClassNames(MaxWidth.SCREEN_LARGE, Margin.Horizontal.AUTO, Padding.Bottom.LARGE, Padding.Horizontal.LARGE);

        HorizontalLayout container = new HorizontalLayout();
        container.addClassNames(AlignItems.CENTER, JustifyContent.BETWEEN);

        VerticalLayout headerContainer = new VerticalLayout();
        H2 header = new H2("Stay Informed with the Latest News from the Computer Science Club!");
        header.addClassNames(Margin.Bottom.NONE, Margin.Top.XLARGE, FontSize.XXXLARGE);
        Paragraph description = new Paragraph("Welcome to the News page of the Computer Science Club at Mama Ngina University College. Here, you'll find the latest updates on our events, achievements, announcements, and more. Stay connected to keep up with our journey of innovation, learning, and community engagement.");
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
