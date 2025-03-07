import { useState, useEffect } from "react";
import { useOrderbookStream } from "@orderly.network/hooks";

import "./index.css";

const Orderbook = ({ symbol }: { symbol: string }) => {
  const [data, { isLoading }] = useOrderbookStream(symbol, undefined, {
    level: 11,
  });
  const [prevMarkPrice, setPrevMarkPrice] = useState<number | null>(null);
  const [priceColor, setPriceColor] = useState<string>("");

  useEffect(() => {
    if (data?.markPrice !== undefined) {
      if (prevMarkPrice !== null) {
        if (data.markPrice > prevMarkPrice) {
          setPriceColor("#40F388"); // Green for increase
        } else if (data.markPrice < prevMarkPrice) {
          setPriceColor("#F35540"); // Red for decrease
        }
      }
      setPrevMarkPrice(data.markPrice);
    }
  }, [data?.markPrice, prevMarkPrice]);

  return (
    <div
      style={{
        maxHeight: "100%",
        height: "100%",
        width: "100%",
        padding: "0px 0px", // Added vertical padding
        borderLeft: "1px solid #3B3B3B",
        borderBottom: "1px solid #3B3B3B",
      }}
    >
      <div
        style={{
          width: "100%",
          textAlign: "center",
          padding: "10px",
          backgroundColor: "#000",
          borderBottom: "2px solid #1d1d1d",
          color: "white",
          fontFamily: "Sk-Modernist-Bold",
          fontSize: 16,
        }}
      >
        Order Book
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          border: "1px solid #3B3B3B",
          padding: "5px",
          borderTop: 0,
        }}
      >
        <div
          style={{
            color: "#4B4B4B",
            textAlign: "left",
            fontFamily: "Sk-Modernist-Regular",
            width: "30%",
          }}
        >
          Size
        </div>
        <div
          style={{
            color: "#4B4B4B",
            textAlign: "right",
            fontFamily: "Sk-Modernist-Regular",
            width: "30%",
          }}
        >
          Price
        </div>
        <div
          style={{
            color: "#4B4B4B",
            textAlign: "right",
            fontFamily: "Sk-Modernist-Regular",
            width: "30%",
          }}
        >
          Mine
        </div>
      </div>
      {!isLoading && (
        <div style={{ width: "100%" }}>
          {data.asks
            ?.filter(([price]) => !Number.isNaN(price))
            .map(([price, quantity, aggregated]) => {
              const gradient = (100 * aggregated) / data.asks[0][2];
              return (
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                        width: "33%",
                        marginLeft: 12,
                        fontSize: 16,
                      }}
                    >
                      {quantity}
                    </div>
                    <div
                      style={{
                        textAlign: "right",
                        fontFamily: "Sk-Modernist-Regular",
                        width: "33%",
                        fontSize: 16,
                        color: "#F35540",
                      }}
                    >
                      {price}
                    </div>
                    <div
                      style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        background: `linear-gradient(to left, rgba(64, 34, 34, 0.8) ${gradient}%, transparent ${gradient}%)`,
                        textAlign: "right",
                        fontFamily: "Sk-Modernist-Regular",
                        width: "33%",
                      }}
                    >
                      {aggregated}
                    </div>
                  </div>
                </>
              );
            })}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              borderBottom: "1px solid #3B3B3B",
              borderTop: "1px solid #3B3B3B",
              padding: "10px 6px", // Increased vertical padding
            }}
          >
            <div
              style={{
                color: priceColor,
                textAlign: "left",
                fontFamily: "Sk-Modernist-Bold",
                width: "30%",
                fontSize: 19,
              }}
            >
              ${data?.markPrice}
            </div>
          </div>
          {data.bids
            ?.filter(([price]) => !Number.isNaN(price))
            .map(([price, quantity, aggregated]) => {
              const gradient = (100 * aggregated) / data.asks[0][2];
              return (
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        textAlign: "left",
                        fontFamily: "Sk-Modernist-Regular",
                        width: "33%",
                        marginLeft: 12,
                        fontSize: 16,
                      }}
                    >
                      {quantity}
                    </div>
                    <div
                      style={{
                        color: "#40F388",
                        textAlign: "right",
                        fontFamily: "Sk-Modernist-Regular",
                        width: "33%",
                        fontSize: 16,
                      }}
                    >
                      {price}
                    </div>
                    <div
                      style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        background: `linear-gradient(to left, rgba(40, 81, 57, 0.8) ${gradient}%, transparent ${gradient}%)`,
                        textAlign: "right",
                        fontFamily: "Sk-Modernist-Regular",
                        width: "33%",
                      }}
                    >
                      {aggregated}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default Orderbook;
