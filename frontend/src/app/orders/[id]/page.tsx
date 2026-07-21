import { OrderTrackingClient } from "@/components/orders/OrderTrackingClient";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderTrackingClient bookingId={id} />;
}
