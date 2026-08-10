"use client";

import { Button } from "@/components/ui";
import { deleteProduct } from "./actions";

type DeleteProductButtonProps = {
  productId: string;
  productName: string;
  familySlug: string;
  productSlug: string;
};

export function DeleteProductButton({
  productId,
  productName,
  familySlug,
  productSlug,
}: DeleteProductButtonProps) {
  return (
    <form
      action={deleteProduct}
      onSubmit={(event) => {
        if (
          !window.confirm(
            `Delete "${productName}"? This permanently removes the product, its images, and variants. This cannot be undone.`
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="product_id" value={productId} />
      <input type="hidden" name="family_slug" value={familySlug} />
      <input type="hidden" name="product_slug" value={productSlug} />
      <Button type="submit" variant="danger">
        Delete product
      </Button>
    </form>
  );
}
