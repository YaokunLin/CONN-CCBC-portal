/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="Cypress" />

context('Homepage', () => {
  beforeEach(function () {
    const mockedDateString = '2022-10-10';
    const mockedDate = new Date(mockedDateString);
    cy.useMockedTime(mockedDate);
    cy.sqlFixture('dev/001_intake');
    cy.visit('/applicantportal');
  });

  // Commenting out radio inputs until we pass in proper names or ids to select from

  it('should start and fill the first page of the form', () => {
    cy.get('body').happoScreenshot({ component: 'Applicant Landing Page' });

    cy.get('h1').contains('Welcome');

    cy.get('a').contains('program details');

    // Todo: find a way around using these wait
    cy.wait(4000);

    cy.get('button').contains('Go to dashboard').click();

    cy.url().should('contain', '/dashboard');

    // Dashboard page
    cy.get('h1').contains('Dashboard');

    cy.get('body').happoScreenshot({ component: 'Dashboard Page' });

    cy.get('button').contains('Create application').click();

    cy.wait(4000);

    // Project information page

    cy.get('h1').contains('Project information');
    cy.get('[id="root_projectTitle"]');

    cy.get('[id="root_geographicAreaDescription"]').type('test');

    cy.get('[id="root_projectDescription"]').type('test');

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Project Information Page' });

    cy.get('button').contains('Save and continue').click();

    // Project area page

    cy.get('h1').contains('Project area');

    cy.get('a').contains('project zones');

    cy.get('input[id="root_geographicArea-0"]').parent().click({ force: true });

    cy.get('input[id="root_projectSpanMultipleLocations-0"]').parent().click();

    cy.get('input[id="root_provincesTerritories-0"]').parent().click();

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Project Area Page' });

    cy.get('button').contains('Save and continue').click();

    // Existing network coverage page
    cy.get('h1').contains('Existing network coverage');

    cy.get('input[id="root_hasProvidedExitingNetworkCoverage-0"]').parent();

    cy.get('input[id="root_hasProvidedExitingNetworkCoverage-0"]')
      .parent()
      .click({ force: true });
    cy.get('input[id="root_hasProvidedExitingNetworkCoverage-1"]')
      .parent()
      .click({ force: true });
    cy.get('input[id="root_hasProvidedExitingNetworkCoverage-2"]')
      .parent()
      .click({ force: true });

    cy.get('input[id="root_hasPassiveInfrastructure-0"]').parent().click();

    cy.get('input[id="root_isInfrastructureAvailable-0"]').parent().click();

    cy.get('input[id="root_requiresThirdPartyInfrastructureAccess-0"]')
      .parent()
      .click();
    cy.get('input[id="root_requiresThirdPartyInfrastructureAccess-1"]')
      .parent()
      .click();

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({
      component: 'Existing Network Coverage Page',
    });

    cy.get('button').contains('Save and continue').click();

    // // Budget details page
    cy.get('h1').contains('Budget details');

    cy.get('[id="root_totalEligibleCosts"]');

    cy.get('[id="root_totalProjectCost"]');

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Budget Details Page' });

    cy.get('button').contains('Save and continue').click();

    // // Project funding page
    cy.get('h1').contains('Project funding');

    cy.get('[id="root_fundingRequestedCCBC2223"]').then(() => {
      cy.wait(500);
    });

    cy.get('[id="root_fundingRequestedCCBC2223"]').type(123);
    cy.get('[id="root_fundingRequestedCCBC2324"]').type(123);
    cy.get('[id="root_fundingRequestedCCBC2425"]').type(123);
    cy.get('[id="root_fundingRequestedCCBC2526"]').type(123);
    cy.get('[id="root_fundingRequestedCCBC2627"]').type(123);

    cy.get('[id="root_applicationContribution2223"]').type(123);
    cy.get('[id="root_applicationContribution2324"]').type(123);
    cy.get('[id="root_applicationContribution2425"]').type(123);
    cy.get('[id="root_applicationContribution2526"]').type(123);
    cy.get('[id="root_applicationContribution2627"]').type(123);

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Project Funding Page' });

    cy.get('button').contains('Save and continue').click();

    // Other funding sources page

    cy.get('h1').contains('Other funding sources');

    cy.get('[id="root_infrastructureBankFunding2223"]').type(123);
    cy.get('[id="root_infrastructureBankFunding2324"]').type(123);
    cy.get('[id="root_infrastructureBankFunding2425"]').type(123);
    cy.get('[id="root_infrastructureBankFunding2526"]').type(123);

    cy.get('input[id="root_otherFundingSources-0"]').parent().click();

    cy.get('[id="root_otherFundingSourcesArray_0_fundingPartnersName"]').type(
      'test'
    );

    cy.get(
      '[id="root_otherFundingSourcesArray_0_fundingSourceContactInfo"]'
    ).type('test');

    cy.get(
      'select[id="root_otherFundingSourcesArray_0_statusOfFunding"]'
    ).select('Submitted');

    cy.get('select[id="root_otherFundingSourcesArray_0_funderType"]').select(
      'Federal'
    );

    cy.get('[id="root_otherFundingSourcesArray_0_nameOfFundingProgram"]').type(
      'test'
    );

    cy.get(
      '[id="root_otherFundingSourcesArray_0_requestedFundingPartner2223"]'
    ).type(123);

    cy.get(
      '[id="root_otherFundingSourcesArray_0_requestedFundingPartner2324"]'
    ).type(123);

    cy.get(
      '[id="root_otherFundingSourcesArray_0_requestedFundingPartner2425"]'
    ).type(123);

    cy.get(
      '[id="root_otherFundingSourcesArray_0_requestedFundingPartner2526"]'
    ).type(123);

    cy.get(
      '[id="root_otherFundingSourcesArray_0_requestedFundingPartner2627"]'
    ).type(123);

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Other Funding Sources Page' });

    cy.get('button').contains('Save and continue').click();

    // // Technological solution page
    cy.get('h1').contains('Technological solution');

    cy.get('[id="root_systemDesign"]');

    cy.get('[id="root_systemDesign"]').type('test', { force: true });

    cy.get('[id="root_scalability"]').type('test', { force: true });

    cy.get('input[id="root_backboneTechnology-0"]').parent().click();
    cy.get('input[id="root_backboneTechnology-1"]').parent().click();
    cy.get('input[id="root_backboneTechnology-2"]').parent().click();

    cy.get('input[id="root_lastMileTechnology-0"]').parent().click();
    cy.get('input[id="root_lastMileTechnology-1"]').parent().click();
    cy.get('input[id="root_lastMileTechnology-2"]').parent().click();
    cy.get('input[id="root_lastMileTechnology-3"]').parent().click();

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({
      component: 'Technological Solution Page',
    });

    cy.get('button').contains('Save and continue').click();

    // // Benefits page

    cy.get('h1').contains('Benefits');

    cy.get('[id="root_projectBenefits"]').type('test', { force: true });

    cy.get('[id="root_numberOfHouseholds"]').type('12.3');

    cy.get('[id="root_householdsImpactedIndigenous"]').type('1.23');

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Benefits Page' });

    cy.get('button').contains('Save and continue').click();

    // // // Project planning and management page
    cy.get('h1').contains('Project planning and management');

    cy.get('#root_projectStartDate');

    cy.get('#root_projectCompletionDate');

    cy.get('[id="root_relationshipManagerApplicant"]').type('test');

    cy.get('[id="root_overviewOfProjectParticipants"]').type('test');

    cy.get('[id="root_operationalPlan"]').type('test');

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({
      component: 'Project Planning and Management Page',
    });

    cy.get('button').contains('Save and continue').click();

    // // Estimated project employment page

    cy.get('h1').contains('Estimated project employment');

    cy.get('[id="root_currentEmployment"]').type(20);

    cy.get('[id="root_numberOfEmployeesToWork"]').type(12);

    cy.get('[id="root_hoursOfEmploymentPerWeek"]').type(12);

    cy.get('[id="root_personMonthsToBeCreated"]').type(12);

    cy.get('[id="root_numberOfContractorsToWork"]').type(12);

    cy.get('[id="root_hoursOfContractorEmploymentPerWeek"]').type(12);

    cy.get('[id="root_contractorPersonMonthsToBeCreated"]').type(12);

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({
      component: 'Estimated Project Employment Page',
    });

    cy.get('button').contains('Save and continue').click();

    // // Template uploads page

    cy.get('h1').contains('Template uploads');

    // // Todo: file upload
    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Template Uploads Page' });

    cy.get('button').contains('Save and continue').click();

    // // Supporting documents page
    cy.get('h1').contains('Supporting documents');

    cy.get('a').contains('connectingcommunitiesbc@gov.bc.ca');

    // // Todo: file uploads

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Supporting Documents Page' });

    cy.get('button').contains('Save and continue').click();

    // // Coverage page

    cy.get('h1').contains('Coverage');

    cy.get('a').contains('Eligibility Mapping Tool');

    // Todo: file uploads

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Coverage Page' });

    cy.get('button').contains('Save and continue').click();

    // Organization Profile page

    cy.get('h1').contains('Organization profile');

    cy.get('input[id="root_typeOfOrganization-0"]').parent().click();

    cy.get('input[id="root_typeOfOrganization-14"]').parent().click();

    cy.get('input[id="root_other"]').type('test');

    cy.get('input[id="root_organizationName"]').type('Test org name');

    cy.get('input[id="root_isNameLegalName-0"]').parent().click();

    cy.get('input[id="root_isSubsidiary-0"]').parent().click();

    cy.get('input[id="root_parentOrgName"]').type('test');

    cy.get('input[id="root_isIndigenousEntity-0"]').parent().click();

    cy.get('input[id="root_indigenousEntityDesc"]').type('test');

    // Todo: Datepicker test
    cy.get('#root_orgRegistrationDate');

    cy.get('input[id="root_businessNumber"]').type(123);

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Organization Profile Page' });

    cy.get('button').contains('Save and continue').click();

    // // Organization location page

    cy.get('h1').contains('Organization location');

    cy.get('input[id="root_streetNumber"]').type(123);

    cy.get('input[id="root_streetName"]').type('test');

    cy.get('input[id="root_POBox"]').type('test');

    cy.get('input[id="root_city"]').type('test');

    cy.get('select[id="root_province"]').select('British Columbia');

    cy.get('input[id="root_postalCode"]').type('test');

    cy.get('input[id="root_isMailingAddress-1"]').parent().click();

    cy.get('input[id="root_mailingAddress_unitNumberMailing"]').type('test');

    cy.get('input[id="root_mailingAddress_streetNumberMailing"]').type('test');

    cy.get('input[id="root_mailingAddress_streetNameMailing"]').type('test');

    cy.get('input[id="root_mailingAddress_POBoxMailing"]').type('test');

    cy.get('input[id="root_mailingAddress_cityMailing"]').type('test');

    cy.get('select[id="root_mailingAddress_provinceMailing"]').select(
      'British Columbia'
    );

    cy.get('input[id="root_mailingAddress_postalCodeMailing"]').type('test');

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Organization Location Page' });

    cy.get('button').contains('Save and continue').click();

    // // Organization contact information page

    cy.get('h1').contains('Organization contact information');

    cy.get('input[id="root_contactTelephoneNumber"]').type('123-4567');

    cy.get('input[id="root_contactExtension"]').type('123');

    cy.get('input[id="root_contactEmail"]').type('test@test.com');

    cy.get('input[id="root_contactWebsite"]').type('test');

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({
      component: 'Organization Contact Information Page',
    });

    cy.get('button').contains('Save and continue').click();

    // // Authorized contact page

    cy.get('h1').contains('Authorized business contact');

    cy.get('input[id="root_authFamilyName"]').type('test');

    cy.get('input[id="root_authGivenName"]').type('test');

    cy.get('input[id="root_authPositionTitle"]').type('test');

    cy.get('input[id="root_authEmail"]').type('test@test.com');

    cy.get('input[id="root_authTelephone"]').type('123-456');

    cy.get('input[id="root_authExtension"]').type('123');

    cy.get('input[id="root_isAuthContactSigningOfficer-0"]').parent().click();

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Authorized Contact Page' });

    cy.get('button').contains('Save and continue').click();

    // // Alternate contact page

    cy.get('h1').contains('Alternate business contact');

    cy.get('input[id="root_altFamilyName"]').type('test');

    cy.get('input[id="root_altGivenName"]').type('test');

    cy.get('input[id="root_altPositionTitle"]').type('test');

    cy.get('input[id="root_altEmail"]').type('test@test.com');

    cy.get('input[id="root_altTelephone"]').type('123-456');

    cy.get('input[id="root_altExtension"]').type('123');

    cy.get('input[id="root_isAltContactSigningOfficer-0"]').parent().click();

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Alternate Contact Page' });

    cy.get('button').contains('Save and continue').click();

    // // Review page

    cy.get('h1').contains('Review');

    cy.get('input[id="root_acknowledgeIncomplete"]').parent().click();

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Review Page' });

    cy.get('button').contains('Save and continue').click();

    // // Acknowledgements page

    cy.get('h1').contains('Acknowledgements');

    cy.get('input[id="root_acknowledgementsList-0"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-1"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-2"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-3"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-4"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-5"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-6"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-7"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-8"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-9"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-10"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-11"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-12"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-13"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-14"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-15"]').parent().click();

    cy.get('input[id="root_acknowledgementsList-16"]').parent().click();

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Acknowledgements Page' });

    cy.get('button').contains('Save and continue').click();

    // // Sign Submission

    cy.get('h1').contains('Submission');

    cy.get('[id="root_submissionCompletedFor"]').should(
      'have.text',
      'Test org name'
    );

    cy.get('input[id="root_submissionCompletedBy"]').type('test');
    cy.get('input[id="root_submissionTitle"]').type('test');

    cy.get('[id="root_submissionDate"]').should('have.text', '2022-10-09');

    cy.get('header > div').contains('Last saved:');

    cy.get('body').happoScreenshot({ component: 'Submission Page' });

    cy.get('button').contains('Submit').click();

    cy.wait(1000);

    // // Success page

    cy.get('h2').contains('Application submitted');

    cy.get('h3').contains('Thank you for applying to CCBC Intake 1');

    cy.get('body').happoScreenshot({ component: 'Success Page' });

    cy.get('button').contains('Return to dashboard').click();
  });

  it('should see dashboard and have disabled form out of intake', () => {
    const mockedDateString = '2025-10-10';
    const mockedDate = new Date(mockedDateString);
    cy.useMockedTime(mockedDate);

    cy.get('h1').contains('Welcome');

    cy.get('a').contains('program details');

    // Todo: find a way around using these wait
    cy.wait(2000);

    cy.get('button').contains('Go to dashboard').click();

    cy.url().should('contain', '/dashboard');

    // Dashboard page
    cy.get('h1').contains('Dashboard');
    cy.get('body').happoScreenshot({ component: 'Out of Intake Dashboard' });

    cy.get('a').contains('View').click();

    // Project information page

    cy.get('[id="root_projectTitle"]').should('be.disabled');
    cy.get('[id="root_geographicAreaDescription"]').should('be.disabled');
    cy.get('[id="root_projectDescription"]').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Project Information Page',
    });

    cy.get('button').contains('Continue').click();

    // Project area page

    cy.get('h1').contains('Project area');

    cy.get('a').contains('project zones');

    cy.get('input').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Project Area Page',
    });

    cy.get('button').contains('Continue').click();

    // Existing network coverage page
    cy.get('h1').contains('Existing network coverage');

    cy.get('input').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Existing Network Coverage Page',
    });

    cy.get('button').contains('Continue').click();

    // // Budget details page
    cy.get('h1').contains('Budget details');

    cy.get('input').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Budget Details Page',
    });

    cy.get('button').contains('Continue').click();

    // // Project funding page
    cy.get('h1').contains('Project funding');

    cy.get('input').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Project Funding Page',
    });

    cy.get('button').contains('Continue').click();

    // Other funding sources page

    cy.get('h1').contains('Other funding sources');

    cy.get('input').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Other Funding Sources Page',
    });

    cy.get('button').contains('Continue').click();

    // Technological solution page
    cy.get('h1').contains('Technological solution');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Technological Solution Page',
    });

    cy.get('input').should('be.disabled');

    cy.get('button').contains('Continue').click();

    // Benefits page

    cy.get('h1').contains('Benefits');

    cy.get('input').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Benefits Page',
    });

    cy.get('button').contains('Continue').click();

    // // // Project planning and management page
    cy.get('h1').contains('Project planning and management');

    cy.get('input').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Project Planning and Management Page',
    });

    cy.get('button').contains('Continue').click();

    // // Estimated project employment page

    cy.get('h1').contains('Estimated project employment');

    cy.get('input').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Estimated Project Employment Page',
    });

    cy.get('button').contains('Continue').click();

    // // Template uploads page

    cy.get('h1').contains('Template uploads');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Template Uploads Page',
    });

    cy.get('button').contains('Continue').click();

    // // Supporting documents page
    cy.get('h1').contains('Supporting documents');

    cy.get('a').contains('connectingcommunitiesbc@gov.bc.ca');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Supporting Documents Page',
    });

    cy.get('button').contains('Continue').click();

    // // Coverage page

    cy.get('h1').contains('Coverage');

    cy.get('a').contains('Eligibility Mapping Tool');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Coverage Page',
    });

    cy.get('button').contains('Continue').click();

    // Organization Profile page

    cy.get('h1').contains('Organization profile');

    cy.get('input').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Organization Profile Page',
    });

    cy.get('button').contains('Continue').click();

    // Organization location page

    cy.get('h1').contains('Organization location');

    cy.get('input').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Organization Location Page',
    });

    cy.get('button').contains('Continue').click();

    // Organization contact information page

    cy.get('h1').contains('Organization contact information');

    cy.get('input').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Organization Contact Information Page',
    });

    cy.get('button').contains('Continue').click();

    // Authorized contact page

    cy.get('h1').contains('Authorized business contact');

    cy.get('input').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Authorized Contact Page',
    });

    cy.get('button').contains('Continue').click();

    // // Alternate contact page

    cy.get('h1').contains('Alternate business contact');

    cy.get('input').should('be.disabled');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Alternate Contact Page',
    });

    cy.get('button').contains('Continue').click();

    // // Review page

    cy.get('h1').contains('Review');

    cy.get('body').happoScreenshot({ component: 'Out of Intake Review Page' });

    cy.get('button').contains('Continue').click();

    // // Acknowledgements page

    cy.get('h1').contains('Acknowledgements');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Acknowledgements Page',
    });

    cy.get('button').contains('Continue').click();

    // // Sign Submission

    cy.get('h1').contains('Submission');

    cy.get('[id="root_submissionCompletedFor"]').should(
      'have.text',
      'Test org name'
    );

    cy.get('input[id="root_submissionCompletedBy"]').should('be.disabled');
    cy.get('input[id="root_submissionTitle"]').should('be.disabled');

    cy.get('[id="root_submissionDate"]').should('have.text', '2022-10-09');

    cy.get('body').happoScreenshot({
      component: 'Out of Intake Submission Page',
    });

    cy.get('button').contains('Submit').should('be.disabled');

    cy.get('button').contains('Return to dashboard').click();

    cy.wait(1000);

    cy.url().should('contain', '/dashboard');
  });

  it('should render the header', () => {
    cy.get('header').contains('Email us');
    cy.get('header').get('.banner').find('img');
    cy.get('.pg-menu-group').find('a').contains('Dashboard');
    cy.get('.pg-menu-group').find('form').get('button').contains('Logout');
  });

  it('should render the footer', () => {
    cy.get('footer').contains('Program details');
    cy.get('footer').contains('Disclaimer');
    cy.get('footer').contains('Privacy');
    cy.get('footer').contains('Accessibility');
    cy.get('footer').contains('Copyright');
  });
});
