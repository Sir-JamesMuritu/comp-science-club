package com.computerscience.views.clubactivities;

import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.ListItem;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.theme.lumo.LumoUtility.*;

public class ClubActivitiesViewCard extends ListItem {

    private Dialog dialog;

    public ClubActivitiesViewCard(String text, String url) {
        addClassNames(Background.CONTRAST_5, Display.FLEX, FlexDirection.COLUMN, AlignItems.START, Padding.MEDIUM, BorderRadius.LARGE);

        // Image container
        Div div = new Div();
        div.addClassNames(Background.CONTRAST, Display.FLEX, AlignItems.CENTER, JustifyContent.CENTER,
                Margin.Bottom.MEDIUM, Overflow.HIDDEN, BorderRadius.MEDIUM, Width.FULL);
        div.setHeight("160px");

        // Image
        Image image = new Image(url, text);
        image.setWidth("100%");
        div.add(image);

        // Header and description
        Span header = new Span(text);
        header.addClassNames(FontSize.XLARGE, FontWeight.SEMIBOLD);

        Paragraph description = new Paragraph(
                "Explore various skill development workshops, hands-on training, and events designed to enhance IT skills.");
        description.addClassName(Margin.Vertical.MEDIUM);

        Span badge = new Span("Label");
        badge.getElement().setAttribute("theme", "badge");

        // Initialize dialog
        dialog = createPopupDialog(text, url, description.getText());

        // Toggle dialog visibility on click
        addClickListener(event -> {
            if (dialog.isOpened()) {
                dialog.close();
            } else {
                dialog.open();
            }
        });

        // Add components to card
        add(div, header, description, badge);
    }

    private Dialog createPopupDialog(String text, String url, String description) {
        Dialog dialog = new Dialog();
        dialog.setModal(true);
        dialog.setDraggable(false);
        dialog.setResizable(false);
        dialog.setWidth("60%");
        dialog.setHeight("100%");
        dialog.addClassNames("popup-dialog");

        // Content for dialog
        Div dialogContent = new Div();
        dialogContent.addClassNames(Display.FLEX, FlexDirection.COLUMN, Padding.LARGE);

        Image dialogImage = new Image(url, text);
        dialogImage.setWidth("100%");

        Span dialogHeader = new Span(text);
        dialogHeader.addClassNames(FontSize.XXLARGE, FontWeight.BOLD, Margin.Bottom.SMALL);

        Paragraph dialogDescription = new Paragraph(description);
        dialogDescription.addClassNames(FontSize.MEDIUM, TextColor.BODY);

        // Add content to dialog
        dialogContent.add(dialogImage, dialogHeader, dialogDescription);
        dialog.add(dialogContent);

        return dialog;
    }
}
