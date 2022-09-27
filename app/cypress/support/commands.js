import 'happo-cypress';

Cypress.Commands.add('sqlFixture', (fixtureName) => {
  return cy.fixture(`${fixtureName}.sql`).then((fixture) =>
    cy.exec(
      `psql -v "ON_ERROR_STOP=1" -d ccbc<< 'EOF'
${fixture}
EOF`
    )
  );
});

Cypress.Commands.add('useMockedTime', (datetime) => {
  cy.setCookie('mocks.mocked_timestamp', String(datetime.valueOf() / 1000));
});

Cypress.Commands.add('clearMockedTime', () => {
  cy.clearCookie('mocks.mocked_timestamp');
});
