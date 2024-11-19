package com.computerscience.views;

import com.computerscience.data.User;
import com.computerscience.security.AuthenticatedUser;
import com.computerscience.views.clubactivities.ClubActivitiesView;
import com.computerscience.views.contactus.ContactUsView;
import com.computerscience.views.executivegroup.ExecutiveGroupView;
import com.computerscience.views.faqs.FAQsView;
import com.computerscience.views.feedback.FeedbackView;
import com.computerscience.views.homepage.HomePageView;
import com.computerscience.views.memberlist.MemberListView;
import com.computerscience.views.membersgroup.MembersGroupView;
import com.computerscience.views.membershipapplication.MembershipApplicationView;
import com.computerscience.views.news.NewsView;
import com.computerscience.views.resources.ResourcesView;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Footer;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Header;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.server.auth.AccessAnnotationChecker;
import com.vaadin.flow.theme.lumo.LumoUtility;
import java.io.ByteArrayInputStream;
import java.util.Optional;
import org.vaadin.lineawesome.LineAwesomeIcon;

/**
 * The main view is a top-level placeholder for other views.
 */
public class MainLayout extends AppLayout {

    private H1 viewTitle;

    private AuthenticatedUser authenticatedUser;
    private AccessAnnotationChecker accessChecker;

    public MainLayout(AuthenticatedUser authenticatedUser, AccessAnnotationChecker accessChecker) {
        this.authenticatedUser = authenticatedUser;
        this.accessChecker = accessChecker;

        setPrimarySection(Section.DRAWER);
        addDrawerContent();
        addHeaderContent();
    }

    private void addHeaderContent() {
        DrawerToggle toggle = new DrawerToggle();
        toggle.setAriaLabel("Menu toggle");

        viewTitle = new H1();
        viewTitle.addClassNames(LumoUtility.FontSize.LARGE, LumoUtility.Margin.NONE);

        addToNavbar(true, toggle, viewTitle);
    }

    private void addDrawerContent() {
        Span appName = new Span("Comp-Science-Club");
        appName.addClassNames(LumoUtility.FontWeight.SEMIBOLD, LumoUtility.FontSize.LARGE);
        Header header = new Header(appName);

        Scroller scroller = new Scroller(createNavigation());

        addToDrawer(header, scroller, createFooter());
    }

    private SideNav createNavigation() {
        SideNav nav = new SideNav();

        if (accessChecker.hasAccess(HomePageView.class)) {
            nav.addItem(new SideNavItem("Home Page", HomePageView.class, LineAwesomeIcon.LAPTOP_CODE_SOLID.create()));

        }
        if (accessChecker.hasAccess(ClubActivitiesView.class)) {
            nav.addItem(new SideNavItem("Club Activities", ClubActivitiesView.class,
                    LineAwesomeIcon.TH_LIST_SOLID.create()));

        }
        if (accessChecker.hasAccess(MemberListView.class)) {
            nav.addItem(new SideNavItem("Member List", MemberListView.class, LineAwesomeIcon.LIST_SOLID.create()));

        }
        if (accessChecker.hasAccess(FeedbackView.class)) {
            nav.addItem(new SideNavItem("Feedback", FeedbackView.class, LineAwesomeIcon.CONNECTDEVELOP.create()));

        }
        if (accessChecker.hasAccess(MembershipApplicationView.class)) {
            nav.addItem(new SideNavItem("Membership Application", MembershipApplicationView.class,
                    LineAwesomeIcon.USER.create()));

        }
/*        if (accessChecker.hasAccess(ExecutiveGroupView.class)) {
            nav.addItem(
                    new SideNavItem("Executive Group", ExecutiveGroupView.class, LineAwesomeIcon.SOURCETREE.create()));

        }
 * */
        if (accessChecker.hasAccess(MembersGroupView.class)) {
            nav.addItem(new SideNavItem("Members Group", MembersGroupView.class, LineAwesomeIcon.COMMENTS.create()));

        }
        if (accessChecker.hasAccess(ResourcesView.class)) {
            nav.addItem(new SideNavItem("Resources", ResourcesView.class, LineAwesomeIcon.BOOK_READER_SOLID.create()));

        }
        if (accessChecker.hasAccess(NewsView.class)) {
            nav.addItem(new SideNavItem("News", NewsView.class, LineAwesomeIcon.TH_LIST_SOLID.create()));

        }
        if (accessChecker.hasAccess(ContactUsView.class)) {
            nav.addItem(
                    new SideNavItem("Contact Us", ContactUsView.class, LineAwesomeIcon.PENCIL_RULER_SOLID.create()));

        }
        if (accessChecker.hasAccess(FAQsView.class)) {
            nav.addItem(new SideNavItem("FAQs", FAQsView.class, LineAwesomeIcon.LIST_SOLID.create()));

        }

        return nav;
    }

    private Footer createFooter() {
        Footer layout = new Footer();

        Optional<User> maybeUser = authenticatedUser.get();
        if (maybeUser.isPresent()) {
            User user = maybeUser.get();

            Avatar avatar = new Avatar(user.getName());
            StreamResource resource = new StreamResource("profile-pic",
                    () -> new ByteArrayInputStream(user.getProfilePicture()));
            avatar.setImageResource(resource);
            avatar.setThemeName("xsmall");
            avatar.getElement().setAttribute("tabindex", "-1");

            MenuBar userMenu = new MenuBar();
            userMenu.setThemeName("tertiary-inline contrast");

            MenuItem userName = userMenu.addItem("");
            Div div = new Div();
            div.add(avatar);
            div.add(user.getName());
            div.add(new Icon("lumo", "dropdown"));
            div.getElement().getStyle().set("display", "flex");
            div.getElement().getStyle().set("align-items", "center");
            div.getElement().getStyle().set("gap", "var(--lumo-space-s)");
            userName.add(div);
            userName.getSubMenu().addItem("Sign out", e -> {
                authenticatedUser.logout();
            });

            layout.add(userMenu);
        } else {
            Anchor loginLink = new Anchor("login", "Sign in");
            layout.add(loginLink);
        }

        return layout;
    }

    @Override
    protected void afterNavigation() {
        super.afterNavigation();
        viewTitle.setText(getCurrentPageTitle());
    }

    private String getCurrentPageTitle() {
        PageTitle title = getContent().getClass().getAnnotation(PageTitle.class);
        return title == null ? "" : title.value();
    }
}
