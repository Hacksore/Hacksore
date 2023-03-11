import { test } from "@playwright/test";
import "dotenv/config";

const { PARKING_WEBSITE, PARKING_CODE, APT_NUMBER } = process.env;

if (!PARKING_WEBSITE || !PARKING_CODE || !APT_NUMBER) {
  throw new Error("Missing env vars");
}

const user = {
  fistName: "Sean",
  lastName: "Boult",
}

test("test", async ({ page }) => {
  await page.goto(PARKING_WEBSITE);
  await page.locator("#cphMainCell_txtRegCode_I").click();
  await page.locator("#cphMainCell_txtRegCode_I").fill(PARKING_CODE);
  await page.locator("span").click();
  await page.locator("#cphMainCell_ddlPermitType_I").click();
  await page.getByRole("cell", { name: "48Hr Registered Visitor Pass", exact: true }).click();
  await page.locator("#cphMainCell_txtNewPermitFirstName").click();
  await page.locator("#cphMainCell_txtNewPermitFirstName").fill(user.fistName);
  await page.locator("#cphMainCell_txtNewPermitLastName").click();
  await page.locator("#cphMainCell_txtNewPermitLastName").fill(user.lastName);
  await page.locator("#cphMainCell_txtNewPermitAptSteNumber").click();
  await page.locator("#cphMainCell_txtNewPermitAptSteNumber").fill(APT_NUMBER);
  await page.locator("#cphMainCell_txtNewPermitResidentName").click();
  await page.locator("#cphMainCell_txtNewPermitResidentName").fill(user.fistName);
  await page.locator("#cphMainCell_txtNewPermitVehicleYear").click();
  await page.locator("#cphMainCell_txtNewPermitVehicleYear").fill("0");
  await page.locator("#cphMainCell_txtNewPermitMake").click();
  await page.locator("#cphMainCell_txtNewPermitMake").fill("Tesla");
  await page.locator("#cphMainCell_txtNewPermitModel").click();
  await page.locator("#cphMainCell_txtNewPermitModel").fill("Model Y");
  await page.locator("#cphMainCell_txtNewPermitColor").click();
  await page.locator("#cphMainCell_txtNewPermitColor").fill("Gray");
  await page.locator("#cphMainCell_ddlNewPermitLicenseState").click();
  await page.locator("#cphMainCell_ddlNewPermitLicenseState_I").fill("tx");
  await page.getByRole("cell", { name: "TX", exact: true }).click();
  await page.locator("#cphMainCell_txtNewPermitLicenseNumber").click();
  await page.locator("#cphMainCell_txtNewPermitLicenseNumber").click();
  await page.locator("#cphMainCell_txtNewPermitLicenseNumber").fill("ABC12345");
  await page.locator("#cphMainCell_txtNewPermitLicenseNumber").click();

  // submit form
  await page
    .getByRole("cell", { name: "Submit Registration Request Submit Registration Request", exact: true })
    .locator("span")
    .click();

  // check confirm
  await page.locator('#cphMainCell_cbRegPermitAgreeToRegs').check();
  
  // click verify
  await page.getByText('Verify Verify').click();

  // debug
  // await page.pause();
});
