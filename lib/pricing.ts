const mockCurrentPrice = 45000;

/**
 * Single source for the current ticket price.
 *
 * When Google Sheets is connected, this function will read the `Presupuestos`
 * sheet and select the active tier from its price and quantity ranges according
 * to the number of active reservations.
 */
export async function getCurrentPrice(): Promise<number> {
  return mockCurrentPrice;
}
